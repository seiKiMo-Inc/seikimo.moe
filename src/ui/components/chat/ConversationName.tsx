import React from "react";

import { ReactComponent as Hashtag } from "@icons/hashtag.svg";

import { Conversation } from "@backend/proto/ChatGateway";

interface IProps {
    conversation: Conversation | undefined;
}

class ConversationName extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div className={"flex flex-row gap-[6px] items-center"}>
                <Hashtag className={"Hashtag"} />
                <p>
                    {this.props.conversation?.name ??
                        "No Conversation Selected"}
                </p>
            </div>
        );
    }
}

export default ConversationName;
