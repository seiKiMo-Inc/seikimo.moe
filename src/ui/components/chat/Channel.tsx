import React from "react";

import { ReactComponent as Hashtag } from "@icons/hashtag.svg";

import { formatTime } from "@utils/general";
import { Channel as ChannelType, Message as ChatMessage } from "@backend/proto/ChatGateway";

import "@css/chat/Channel.scss";

interface IProps {
    selected: boolean;
    channel: ChannelType;

    select?: () => void;
    context?: (x: number, y: number) => void;
    pickConversation?: (index: number) => void;
}

interface IState {
    channelsShown: boolean;
}

/**
 * Creates a message.
 *
 * @param message
 */
function message(message: ChatMessage): React.ReactNode {
    if (!message) return undefined;

    // Check if the sender is too long.
    let sender = message.sender?.displayName;
    if (!sender) return undefined;

    if (sender.length > 5) {
        sender = sender.substring(0, 5).trim();
    }

    // Check if the message is too long.
    let text = message.content;
    if (text.length > 15) {
        text = text.substring(0, 15) + "-";
    }

    // TODO: Display timestamp.

    return (
        <div className={"Channel_Message"}>
            <p>{sender}:</p>
            <p>{text}</p>
        </div>
    );
}

class Channel extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            channelsShown: true
        };
    }

    /**
     * Shows the context menu for this channel.
     *
     * @param e The mouse event.
     */
    private showContext(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        // Cancel existing context menu.
        e.preventDefault();
        e.stopPropagation();

        // Show the context menu.
        this.props.context?.(e.clientX, e.clientY);
    }

    render() {
        const { channel } = this.props;

        // Check the title's length.
        let title = channel.name;
        if (title.length > 25) {
            title = title.substring(0, 25) + "-";
        }

        return (
            <>
                <div
                    className={"Channel"}
                    onClick={this.props.select}
                    onContextMenu={this.showContext.bind(this)}
                    style={{ backgroundColor: this.props.selected ? "#2f404d" : "#191919" }}
                >
                    <img alt={"Channel Icon"}
                         className={"Channel_Icon"}
                         src={channel.icon}
                    />

                    <div className={"Channel_Content"}>
                        <p className={"font-bold"}>{title}</p>

                        {message(channel.lastMessages[0])}
                        {message(channel.lastMessages[1])}
                    </div>

                    <p className={"Channel_Time"}>
                        {formatTime(channel.lastMessages[0]?.timestamp)}
                    </p>
                </div>

                {this.props.selected && (
                    <div className={"Channel_Conversations"}>
                        {channel.conversations.map((channel, index) => (
                            <div key={index}
                                 className={"Channel_Conversation"}
                                 onClick={() => this.props.pickConversation?.(index)}
                            >
                                <Hashtag />
                                <p>{channel.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    }
}

export default Channel;
