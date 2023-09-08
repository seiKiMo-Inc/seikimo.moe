import React from "react";

import { ReactComponent as Disconnect } from "@icons/disconnect.svg";

import ConversationName from "@components/chat/ConversationName";

import { Conversation } from "@backend/proto/ChatGateway";

import "@css/chat/CallDisplay.scss";

interface IProps {
    conversation: Conversation | undefined;

    leaveCall: () => void;
}

interface IState {
    height: string | number | null;
}

class CallDisplay extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            height: null
        };
    }

    render() {
        const { conversation } = this.props;
        if (!conversation) return undefined;

        return (
            <div className={"CallDisplay"}
                 style={{
                     height: this.state.height ?? "300vh"
                 }}
            >
                <div className={"CallDisplay_Info"}>
                    <ConversationName conversation={conversation} />
                </div>

                <div className={"CallDisplay_Users"}>
                    {
                        conversation.callParticipants == null || conversation.callParticipants.length == 0 ?
                            <p>No participants.</p> :
                            conversation.callParticipants.map((participant, index) =>
                                <img key={index}
                                     src={participant.icon}
                                     alt={participant.displayName}
                                />
                            )
                    }
                </div>

                <div className={"CallDisplay_Actions"}>
                    <div className={"CallDisplay_LeaveCall"}
                         onClick={this.props.leaveCall}
                    >
                        <Disconnect />
                    </div>
                </div>
            </div>
        );
    }
}

export default CallDisplay;
