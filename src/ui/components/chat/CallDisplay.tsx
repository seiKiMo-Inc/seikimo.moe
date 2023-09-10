import React from "react";

import { BiSolidPhoneCall } from "react-icons/bi";
import { ReactComponent as Disconnect } from "@icons/disconnect.svg";

import ConversationName from "@components/chat/ConversationName";

import { Conversation } from "@backend/proto/ChatGateway";

import "@css/chat/CallDisplay.scss";

interface IProps {
    isInCall: boolean;
    conversation: Conversation | undefined;

    joinCall: () => void;
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
                                <img key={index} draggable={false}
                                     src={participant.icon}
                                     alt={participant.displayName}
                                />
                            )
                    }
                </div>

                <div className={"CallDisplay_Actions"}>
                    {
                        this.props.isInCall ? (
                            <div className={"CallDisplay_CallAction Dim"}
                                 style={{ backgroundColor: "#f44336" }}
                                 onClick={this.props.leaveCall}
                            >
                                <Disconnect />
                            </div>
                        ) : (
                            <div className={"CallDisplay_CallAction Dim"}
                                 style={{ backgroundColor: "limegreen" }}
                                 onClick={this.props.joinCall}
                            >
                                <BiSolidPhoneCall />
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CallDisplay;
