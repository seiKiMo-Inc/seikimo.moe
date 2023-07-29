import React from "react";

import { Message as ChatMessage } from "@backend/proto/ChatGateway";

import "@css/chat/Message.scss";

interface IProps {
    message: ChatMessage;
    onContext?: (x: number, y: number) => void;
}

interface IState {

}

class Message extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    /**
     * Shows the context menu for this message.
     *
     * @param e The mouse event.
     */
    private showContext(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // Cancel existing context menu.
        e.preventDefault();
        e.stopPropagation();

        // Show the context menu.
        this.props.onContext?.(e.clientX, e.clientY);
    }

    render() {
        const { sender, content } = this.props.message;
        if (!sender) return undefined;

        return (
            <div
                className={"Message"}
                onContextMenu={this.showContext.bind(this)}
            >
                <img className={"Message_Icon"} src={sender.icon} alt={sender.displayName} />

                <div className={"Message_Content"}>
                    <p className={"text-sm font-medium"}>{sender.displayName}</p>
                    <p className={"text-sm"}>{content}</p>
                </div>
            </div>
        );
    }
}

export default Message;
