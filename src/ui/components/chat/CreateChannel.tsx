import React from "react";

import { ReactComponent as Close } from "@icons/close.svg";

import { closeDialog } from "@utils/general";

import "@css/chat/CreateChannel.scss";
import { getCredentials } from "@backend/user";
import { newCall } from "@app/index";

interface IState {
    icon: string;
    name: string;
}

class CreateChannel extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            icon: "https://seikimo.moe/icon.png",
            name: ""
        };
    }

    /**
     * Opens the file selector to select a channel icon.
     *
     * @param event The event that triggered this function.
     */
    private setChannelIcon(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {

    }

    /**
     * Resets the form data.
     */
    private reset(): void {
        this.setState({ icon: "https://seikimo.moe/icon.png", name: "" });
    }

    /**
     * Creates the channel.
     */
    private async create(): Promise<void> {
        // Check the channel name.
        const { name } = this.state;
        if (name.length == 0) return;

        // Get the credentials.
        const { token } = getCredentials();

        // Create the channel.
        const response = await fetch(newCall("channel"), {
            method: "POST", headers: { Authorization: token },
            body: JSON.stringify({ name })
        });

        // Check if the response is valid.
        if (!response.ok) {
            throw new Error("Failed to create channel.");
        }

        // Reset the form.
        this.reset();
        // Close the dialog.
        closeDialog("createChannel");
    }

    render() {
        return (
            <dialog className={"CreateChannel"} id={"createChannel"}>
                <div className={"CreateChannel_Content"}>
                    <div className={"CreateChannel_Header"}>
                        <h1>Create a Channel</h1>
                        <h2>Make the "next big thing"</h2>
                    </div>

                    <div className={"flex justify-center mt-2.5 mb-[15px]"}>
                        <img
                            className={"CreateChannel_Icon"}
                            src={this.state.icon}
                            alt={"Channel Icon"}
                            onClick={this.setChannelIcon.bind(this)}
                        />
                    </div>

                    <div>
                        <p className={"CreateChannel_Name"}>Channel Name</p>
                        <input
                            type={"text"}
                            className={"CreateChannel_Input"}
                            placeholder={"My AI Project"}
                            value={this.state.name}
                            onChange={(event) =>
                                this.setState({ name: event.target.value })}
                        />
                    </div>

                    <Close
                        className={"CreateChannel_Close"}
                        onClick={() => closeDialog("createChannel")}
                    />
                </div>

                <div className={"CreateChannel_Actions"}>
                    <p onClick={this.reset.bind(this)}>Reset</p>
                    <button onClick={this.create.bind(this)}>Create</button>
                </div>
            </dialog>
        );
    }
}

export default CreateChannel;
