import React from "react";

import { Message as ChatMessage } from "@backend/proto/ChatGateway";

import "@css/chat/Message.scss";

interface IProps {
    message: ChatMessage;
}

interface IState {

}

class Message extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        const { sender, content } = this.props.message;
        if (!sender) return undefined;

        return (
            <div className={"Message"}>
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
