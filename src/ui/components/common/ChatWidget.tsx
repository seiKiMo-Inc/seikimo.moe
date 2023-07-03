import React from "react";

import type { Message } from "@backend/types";
import { chatSocket } from "@backend/sockets";

import "@css/ChatWidget.scss";

interface IState {
    error: string;
    message: string;
    showChat: boolean;

    username: string;
    messages: Message[];
}

class ChatWidget extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            error: "",
            message: "",
            showChat: false,

            username: "",
            messages: []
        };
    }

    /**
     * Sends a message to the server.
     *
     * @param message The message to send.
     */
    private sendMessage(message: any): void {
        if (chatSocket.readyState == WebSocket.OPEN) {
            chatSocket.send(JSON.stringify(message));
        }
    }

    /**
     * Adds a message to the chat.
     *
     * @param message The message to add.
     */
    private addMessage(message: Message): void {
        const { messages } = this.state;
        messages.push(message);

        this.setState({ messages });
    }

    /**
     * Creates a new message from the server.
     *
     * @param text The text of the message.
     */
    private newServerMessage(text: string): Message {
        return {
            sender: "Server",
            text
        };
    }

    /**
     * Sets the error message.
     *
     * @param error The error message.
     */
    private setError(error: string): void {
        this.setState({ error });
    }

    componentDidMount() {
        chatSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    default:
                        console.error("Unknown message type received from server.", message);
                        return;
                    case "message":
                        this.addMessage(message);
                        return;
                    case "initialize":
                        switch (message.retcode) {
                            case 0:
                                this.setState({ showChat: true });
                                return;
                            case 1:
                                this.setError("That username is taken.");
                                break;
                            case 2:
                                this.setError("Usernames have to be less than 16 characters.");
                                break;
                            case 3:
                                this.setError("Usernames have to be more than 2 characters.");
                                break;
                            case 4:
                                this.setError("You have already connected to the server.");
                                break;
                            case 5:
                                this.setError("Usernames can only contain alphanumeric characters.");
                                break;
                        }
                        setTimeout(() => {
                            this.setError("");
                        }, 2e3);
                        return;
                    case "join":
                        const name = message.name;
                        if (name != this.state.username) {
                            this.addMessage(this.newServerMessage(
                                `${name} joined the chat.`));
                        }
                        return;
                    case "leave":
                        this.addMessage(this.newServerMessage(
                            `${message.name} left the chat.`));
                        return;
                }
            } catch {
                console.error("Failed to parse message from server.");
            }
        };
        chatSocket.onopen = () => {
            console.log("Connected to server.");
        }
        chatSocket.onclose = () => {
            this.addMessage(this.newServerMessage("Disconnected from server."));
        };
    }

    render() {
        const { messages } = this.state;

        return this.state.showChat ? (
            <div className={"ChatWidget"}>
                <div className={"Messages"}>
                    {
                        messages.length == 0 ?
                            <p>Messages typed will appear here.</p> :
                            messages.map((message, index) =>
                                <div key={index} className={"Message"}>
                                    <p>{message.sender}:</p>
                                    <p>{message.text}</p>
                                </div>
                            )
                    }
                </div>

                <div className={"MessageBox"}>
                    <input
                        type={"text"}
                        className={"MessageBox_Input"}
                        value={this.state.message}
                        onKeyDown={(event) => {
                            if (event.key != "Enter") return;

                            this.sendMessage({
                                type: "message",
                                text: this.state.message
                            });
                            this.setState({ message: "" });
                        }}
                        onInput={(event) => {
                            this.setState({ message: event.currentTarget.value });
                        }}
                        placeholder={"Type a message..."}
                    />
                </div>
            </div>
        ) : (
            <div className={"UsernameWidget"}>
                <p>Enter your username below.</p>
                <p className={"text-red-500 text-center"}>{this.state.error}</p>
                <input
                    type={"text"}
                    placeholder={"Username"}
                    maxLength={16} minLength={2}
                    onKeyDown={(event) => {
                        if (event.key != "Enter") return;

                        const username = event.currentTarget.value;
                        this.setState({ username });
                        this.sendMessage({
                            type: "initialize",
                            name: username
                        });
                    }}
                />
            </div>
        );
    }
}

export default ChatWidget;
