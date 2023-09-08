import React from "react";

import { Conversation } from "@backend/proto/ChatGateway";

import "@css/chat/CallDisplay.scss";

interface IProps {
    conversation: Conversation | undefined;
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

        console.log(conversation);

        return (
            <div className={"CallDisplay"}
                 style={{
                     height: this.state.height ?? "300vh"
                 }}
            >
                <div className={"CallDisplay_Info"}>

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

                </div>
            </div>
        );
    }
}

export default CallDisplay;
