import React from "react";

import { MdScreenShare } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";

import Channel from "@components/chat/Channel";
import Message from "@components/chat/Message";
import CreateChannel from "@components/chat/CreateChannel";
import CallDisplay from "@components/chat/CallDisplay";
import ConversationName from "@components/chat/ConversationName";
import ContextMenu, { showMenu } from "@components/common/ContextMenu";

import { newCall } from "@app/index";
import { getCredentials } from "@backend/user";
import { WebRTC, voiceCall, videoCall } from "@backend/rtc";
import { base64Decode, openDialog } from "@utils/general";
import { chatSocket, encode } from "@backend/sockets";
import {
    Channel as ChannelType,
    Message as ChatMessage,
    Conversation,
    AuthenticateCsReq,
    AuthenticateScRsp,
    ChannelScNotify,
    MessageScNotify,
    PacketIds,
    Retcode, Action, ConversationScNotify
} from "@backend/proto/ChatGateway";

import "@css/pages/ChatPage.scss";

interface IProps {

}

interface IState {
    channels: ChannelType[];

    channel: number;
    conversation: number;

    selectedChannel: ChannelType | null;
    boxWidth: number;

    call: WebRTC | null;
    callingIn: string | null;
    callHeight: string | number | null;
}

class ChatPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            channels: [],

            channel: -1,
            conversation: 0,

            selectedChannel: null,
            boxWidth: 0,

            call: null,
            callingIn: null,
            callHeight: "300vh"
        };
    }

    /**
     * Updates the message box's height.
     */
    private updateMessageBox(): void {
        const messageBox = document.getElementById("messagebox") as HTMLTextAreaElement;
        const style = messageBox.style;

        // Compute the height required.
        const maxHeight = parseInt(style.maxHeight.substring(0, style.maxHeight.length - 2));
        const scrollHeight = messageBox.scrollHeight;

        const length = messageBox.textLength;
        const newHeight = length <= 0 && scrollHeight > 45 ? 45 : scrollHeight;
        style.height = `${newHeight}px`;

        // Check if the height passes the max height.
        if (newHeight >= maxHeight) {
            style.overflowY = "scroll";
        }
    }

    /**
     * Shows the context menu for the message.
     *
     * @param message The message to show the context menu for.
     */
    private messageContext(message: ChatMessage): void {

    }

    /**
     * Shows the context menu for the channel.
     *
     * @param x The X position of the context menu.
     * @param y The Y position of the context menu.
     * @param channel The channel to show the context menu for.
     */
    private channelContext(x: number, y: number, channel: ChannelType): void {
        this.setState({ selectedChannel: channel });
        showMenu("channelContext", x, y);
    }

    /**
     * Gets the current conversation.
     */
    private getConversation(): Conversation | undefined {
        const { conversation } = this.state;
        // Get the selected channel.
        return this.getChannel()?.conversations[conversation];
    }

    /**
     * Gets the current channel.
     */
    private getChannel(): ChannelType | null {
        const { channels, channel } = this.state;
        // Check if a channel is selected.
        if (channel == -1) return null;
        // Get the selected channel.
        return channels[channel];
    }

    /**
     * Fetches a conversation from the ID.
     *
     * @param channelId The ID of the channel.
     * @param conversationId The ID of the conversation.
     */
    private getFrom(channelId: string, conversationId: string): Conversation | undefined {
        const channel = this.state.channels.find(channel => channel.id == channelId);
        if (!channel) return undefined;

        return channel.conversations.find(conversation => conversation.id == conversationId);
    }

    /**
     * Sets the current channel.
     *
     * @param index The index of the channel.
     */
    private setChannel(index: number): void {
        this.setState({
            channel: this.state.channel == index ? -1 : index
        });
    }

    /**
     * Gets the messages for the current channel.
     */
    private getMessages(): ChatMessage[] {
        // Get the messages in the conversation.
        const conversation = this.getConversation();
        return conversation ? conversation.messages : [];
    }

    /**
     * Loads the channels.
     */
    private async loadChannels(): Promise<void> {
        // Get the credentials.
        const { token } = getCredentials();
        // Get the channels.
        const response = await fetch(newCall("channel/all"), {
            method: "GET", headers: { Authorization: token }
        });

        // Check if the response is valid.
        if (!response.ok) {
            throw new Error("Failed to load channels.");
        } else {
            const channels = await response.json();
            this.setState({ channels });
        }
    }

    /**
     * Sends the contents of the message box to the selected conversation.
     */
    private async sendMessage(): Promise<void> {
        const messageBox = document.getElementById("messagebox") as HTMLTextAreaElement;
        // Check the content.
        const content = messageBox.value;
        if (content.trim().length == 0) return;

        // Get the credentials.
        const { token } = getCredentials();
        // Get the selected conversation.
        const conversation = this.getConversation();
        if (!conversation) throw new Error("No conversation selected.");

        // Send the message.
        const response = await fetch(newCall(`conversation/${conversation.id}/messages`), {
            method: "POST", headers: { Authorization: token },
            body: JSON.stringify({ content, hasAttachments: false })
        });

        // Check if the response is valid.
        if (!response.ok) {
            throw new Error("Failed to send message.");
        }

        // Clear the message box.
        messageBox.value = "";
    }

    /**
     * Authenticates with the server.
     */
    private authenticate(): void {
        // Get the credentials.
        const { token } = getCredentials();

        // Authenticate with the server.
        chatSocket().send(encode(PacketIds._AuthenticateCsReq,
            AuthenticateCsReq.toBinary({ token })));
    }

    /**
     * Invoked when a message is received.
     *
     * @param event The message event.
     */
    private receiveMessage(event: MessageEvent): void {
        // Base64 decode the data.
        const binary = base64Decode(event.data);

        // Parse the data into a byte array.
        const data = new Uint8Array(binary);
        const view = new DataView(data.buffer);
        // Check the size of the packet.
        if (data.length < 8) return;

        // Read the packet data.
        const packetId = view.getInt32(0);
        const packetLength = view.getInt32(4);
        const packetData = data.slice(8, packetLength + 8);

        // Handle the packet.
        switch (packetId) {
            case PacketIds._AuthenticateScRsp:
                const { retcode } = AuthenticateScRsp.fromBinary(packetData);
                if (retcode != Retcode.SUCCESS) {
                    throw new Error("Failed to authenticate.");
                }

                return;
            case PacketIds._MessageScNotify:
                const { message, channelId, conversationId } =
                    MessageScNotify.fromBinary(packetData);

                // Ensure the message is valid.
                if (!message) throw new Error("Invalid message.");

                // Get the conversation.
                const conversation = this.getFrom(channelId, conversationId);
                if (conversation == undefined)
                    throw new Error("Conversation not found.");

                // Add the message.
                conversation.messages.push(message);

                // Update the user interface.
                this.forceUpdate();
                return;
            case PacketIds._ChannelScNotify:
                const { channel, action } = ChannelScNotify.fromBinary(packetData);

                // Ensure the channel is valid.
                if (!channel) throw new Error("Invalid channel.");

                // Perform the action.
                switch (action) {
                    case Action.CREATE:
                        this.state.channels.push(channel);
                        break;
                    case Action.UPDATE:
                    case Action.UPDATE_LAST:
                        // Get the existing channel.
                        const existing = this.state.channels;
                        const index = existing.findIndex(c => c.id == channel.id);
                        if (index == -1) throw new Error("Channel not found.");

                        if (action == Action.UPDATE) {
                            // Update the list of channels.
                            existing[index] = channel;
                            this.setState({ channels: existing });
                        } else {
                            // Update the last message.
                            existing[index].lastMessages = channel.lastMessages;
                            this.setState({ channels: existing });
                        }
                        return;
                    case Action.DELETE:
                        this.setState({ channels: this.state.channels
                                .filter(c => c.id != channel.id) })
                        return;
                }

                // Update the user interface.
                this.forceUpdate();
                return;
            case PacketIds._ConversationScNotify:
                this.updateConversation(ConversationScNotify.fromBinary(packetData))
                    .then(() => this.forceUpdate())
                    .catch(err => console.error(err));
                return;
        }
    }

    /**
     * Invoked when a conversation should be updated.
     *
     * @param packet The packet.
     */
    private async updateConversation(packet: ConversationScNotify): Promise<void> {
        const { action, conversation: updated } = packet;
        if (!action || !updated) throw new Error("Invalid packet.");

        // Check if the conversation exists.
        const channel = this.getChannel();
        if (!channel) throw new Error("Channel not found.");

        const referenced = channel.conversations.filter(c => c.id == updated.id);
        if (!referenced || referenced.length == 0) throw new Error("Conversation not found.");
        const conversation = referenced[0];

        // Perform the action.
        switch (action) {
            case Action.CALL_START:
                conversation.hasCall = true;
                return;
            case Action.CALL_END:
                conversation.hasCall = false;
                return;
            case Action.CALL_PARTICIPANT_ADD:
            case Action.CALL_PARTICIPANT_REMOVE:
            case Action.CALL_PARTICIPANT_UPDATE:
                conversation.callParticipants = updated.callParticipants;
                return;
        }
    }

    /**
     * Deletes the selected channel.
     */
    private async deleteSelectedChannel(): Promise<void> {
        // Get the selected channel.
        const selected = this.state.selectedChannel;
        if (!selected) throw new Error("No channel selected.");

        // Get the credentials.
        const { token } = getCredentials();
        // Delete the channel.
        const response = await fetch(newCall(`channel/${selected.id}`), {
            method: "DELETE", headers: { Authorization: token }
        });

        // Check if the response is valid.
        if (!response.ok) {
            throw new Error("Failed to delete channel.");
        }

        // Check if the selected channel was deleted.
        const { channels, channel } = this.state;
        if (channels[channel].id == selected.id) {
            this.setState({ channel: -1, conversation: 0 });
        }
    }

    /**
     * Creates a new conversation.
     *
     * @param name The name of the conversation.
     * @private
     */
    private async createConversation(name: string = "Cool Conversation"): Promise<void> {
        // Get the selected channel.
        const selected = this.state.selectedChannel;
        if (!selected) throw new Error("No channel selected.");

        // Get the credentials.
        const { token } = getCredentials();
        // Create the conversation.
        const body = JSON.stringify({
            name, channelId: selected.id
        });
        await fetch(newCall(`conversation`), {
            method: "POST", body, headers: { Authorization: token }
        });
    }

    /**
     * Sets the width of the text input box.
     */
    private applyWidth(): void {
        // Get the content element.
        const content = document.getElementById("content");
        if (!content) return;

        // Compute the width of the content.
        const width = content.clientWidth;
        this.setState({ boxWidth: width - 15 });
    }

    /**
     * Starts a basic audio call.
     *
     * @param withVideo Should a video call be started?
     */
    private async joinCall(withVideo: boolean = false): Promise<void> {
        if (this.state.call) return; // The user is already in a call.

        // Get the conversation.
        const conversation = this.getConversation();
        if (!conversation) return;

        // Create a new call.
        const call = new WebRTC(conversation.id);
        call.ontrack = this.processTrack.bind(this);
        this.setState({ call, callingIn: conversation.id });

        // Join the call.
        await fetch(newCall(`conversation/${conversation.id}/call`), {
            method: "POST", headers: { Authorization: getCredentials().token },
            body: JSON.stringify({ join: true })
        });

        // Start the call.
        await voiceCall(call);
        withVideo && await videoCall(call);
    }

    /**
     * Leaves the current call.
     */
    private async leaveCall(): Promise<void> {
        if (!this.state.call) return; // The user is in a call.

        // Get the conversation.
        const conversation = this.getConversation();
        if (!conversation) return;

        // Leave the current call.
        this.state.call.disconnect();
        this.setState({ call: null, callingIn: null });

        // Leave the call.
        await fetch(newCall(`conversation/${conversation.id}/call`), {
            method: "POST", headers: { Authorization: getCredentials().token },
            body: JSON.stringify({ join: false })
        });
    }

    /**
     * Processes a WebRTC track.
     *
     * @param event The track event.
     */
    private async processTrack(event: RTCTrackEvent): Promise<void> {
        // Process all streams.
        event.streams.forEach(stream => {
            // Check if the stream is an audio stream.
            if (stream.getAudioTracks().length > 0) {
                this.addAudioStream(stream);
            }

            // Check if the stream is a video stream.
            if (stream.getVideoTracks().length > 0) {
                // TODO: Add video stream.
            }
        });
    }

    /**
     * Adds an audio stream to the call.
     *
     * @param stream The stream to add.
     */
    private async addAudioStream(stream: MediaStream): Promise<void> {
        // Check if an audio stream already exists.
        const element = document.getElementById(stream.id);
        if (element) return;

        // Create a new audio element.
        const audio = document.createElement("audio");
        audio.id = stream.id;
        audio.srcObject = stream;
        audio.autoplay = true;

        // Add the audio element.
        document.body.appendChild(audio);
    }

    componentDidMount() {
        this.updateMessageBox();
        this.applyWidth();

        // Load over HTTP.
        this.loadChannels()
            .then(() => console.log("All channels loaded."))
            .catch(console.error);

        // Instantiate the websocket.
        const socket = chatSocket();
        socket.onopen = this.authenticate;
        socket.onmessage = this.receiveMessage.bind(this);
        socket.onclose = () => {};
        socket.onerror = () => {};

        // Register event listeners.
        window.addEventListener("resize", this.applyWidth.bind(this));
    }

    render() {
        const conversation = this.getConversation();

        return (
            <>
                <CreateChannel />

                <ContextMenu id={"channelContext"} options={[
                    { name: "Delete Channel", action: this.deleteSelectedChannel.bind(this) },
                    { name: "New Conversation", action: this.createConversation.bind(this) }
                ]} />

                <div className={"ChatPage"}>
                    <div className={"ChatPage_LeftPane"}>
                        {this.state.channels.map((channel, index) => (
                            <Channel key={index} channel={channel}
                                     selected={this.state.channel == index}
                                     select={() => this.setChannel(index)}
                                     context={(x, y) => this.channelContext(x, y, channel)}
                                     pickConversation={(index) =>
                                         this.setState({ conversation: index })}
                            />
                        ))}

                        <p
                            className={"ChatPage_ChannelCreate"}
                            onClick={() => openDialog("createChannel")}
                        >
                            Create a Channel
                        </p>
                    </div>

                    <div id={"content"} className={"ChatPage_Content"}>
                        {
                            conversation && conversation.hasCall ? (
                                <CallDisplay
                                    conversation={conversation}
                                    isInCall={conversation.id == this.state.callingIn}
                                    joinCall={this.joinCall.bind(this)}
                                    leaveCall={this.leaveCall.bind(this)}
                                />
                            ) : (
                                <div className={"ChatPage_ActionBar"}>
                                    <ConversationName conversation={conversation} />

                                    {
                                        conversation && (
                                            <div className={"ChatPage_Action"}>
                                                <MdScreenShare
                                                    className={"Dim"}
                                                    onClick={() => this.joinCall(true)}
                                                />
                                                <BiSolidPhoneCall
                                                    className={"Dim"}
                                                    onClick={() => this.joinCall()}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }

                        <div className={"ChatPage_MessageList pl-[15px]"}>
                            {
                                this.getMessages().map((message, index) =>
                                    <Message key={index} message={message}
                                             onContext={() => this.messageContext(message)} />
                                )
                            }
                        </div>

                        <div
                            className={"ChatPage_TextBox pl-[15px]"}
                            style={{ width: this.state.boxWidth }}
                        >
                            <textarea
                                id={"messagebox"}
                                className={"ChatPage_Message"}
                                placeholder={"Message the conversation"}
                                onChange={this.updateMessageBox.bind(this)}
                                onKeyDown={(event) => {
                                    if (event.key == "Enter" && !event.shiftKey) {
                                        event.preventDefault();
                                        this.sendMessage().catch(console.error);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={"ChatPage_RightPane"}>
                        right
                    </div>
                </div>
            </>
        );
    }
}

export default ChatPage;
