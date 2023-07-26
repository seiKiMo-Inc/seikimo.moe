import React from "react";

import { newCall } from "@app/index";
import { Durations, Languages } from "@backend/types";
import type { OldPaste } from "@backend/types";

import "@css/pages/PastePage.scss";

interface IState {
    name: string;
    content: string;
    codeBlock: string;
    expiresAfter: number;
}

class PastePage extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            name: "",
            content: "",
            codeBlock: "",
            expiresAfter: 0
        };
    }

    /**
     * Handles keyboard shortcuts.
     *
     * @param event The keyboard event.
     */
    private async handleShortcuts(event: KeyboardEvent) {
        const pressed = event.key;
        const ctrl = event.ctrlKey;

        if (ctrl && pressed == "s") {
            event.preventDefault();
            await this.submit();
        }
    }

    /**
     * Adjusts the height of the textarea to fit the content.
     *
     * @param event
     */
    private adjustHeight(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const element = event.target as HTMLTextAreaElement;
        const style = element.style;

        const content = element.textLength;
        const newHeight = content <= 100 ?
            200 : element.scrollHeight;
        style.height = `${newHeight}px`;

        // Check if the height passes the max height.
        const height = style.height.substring(0, style.height.length - 2);
        const maxHeight = style.maxHeight.substring(0, style.maxHeight.length - 2);
        if (parseInt(height) >= parseInt(maxHeight)) {
            style.overflowY = "scroll";
        }
    }

    /**
     * Submits the paste to the server.
     */
    private async submit() {
        // Get the paste & validate.
        const content = this.state.content.trim();
        if (content.length == 0 || content == "") return;

        // Send the paste to the server.
        const response = await fetch(newCall("paste"), {
            method: "POST", headers: { authorization: "" },
            body: JSON.stringify({ ...this.state, content })
        });

        // Check if the paste was successful.
        if (response.status != 200) {
            alert("Failed to submit paste.");
            return;
        }

        try {
            // Get the paste ID.
            const { id } = await response.json();

            // Add the paste to the history.
            const newPaste = {
                id, name: this.state.name,
                expires: Date.now() + this.state.expiresAfter
            };
            const history = localStorage.getItem("history");
            if (history) {
                const parsed = JSON.parse(history);
                parsed.push(newPaste);
                localStorage.setItem("history", JSON.stringify(parsed));
            } else {
                localStorage.setItem("history", JSON.stringify([newPaste]));
            }

            // Reload the page.
            this.forceUpdate();

            window.open(`paste/${id}`, "_blank");
        } catch {
            alert("Failed to retrieve paste.");
        }
    }

    /**
     * Retrieves the paste history from local storage.
     */
    private retrieveHistory(): OldPaste[] {
        const pastes = localStorage.getItem("history");
        if (!pastes) return [];

        try {
            // Parse the data.
            const data = JSON.parse(pastes);

            // Filter out expired pastes.
            const newData: OldPaste[] = [];
            for (const paste of data) {
                if (paste.expires < 1 || Date.now() > paste.expires) continue;
                newData.push(paste);
            }

            // Write the new data.
            localStorage.setItem("history", JSON.stringify(newData));
            // Return the new data.
            return newData;
        } catch {
            return [];
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleShortcuts.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleShortcuts.bind(this));
    }

    render() {
        return (
            <div className={"PastePage"}>
                <div className={"PastePage_Title"}>
                    <p className={"text-4xl"}>seiKiMo Pastes</p>
                    <p className={"text-xl"}>Simple & swift text sharing.</p>
                </div>

                <div className={"flex flex-row w-full h-full justify-between mt-5"}>
                    <div className={"PastePage_Info"}>
                        <div className={"PastePage_Field"}>
                            <p>Paste Title</p>
                            <input placeholder={"<leave blank for random>"}
                                   onChange={(event) => {
                                       this.setState({ name: event.target.value })
                                   }}
                            />
                        </div>

                        <div className={"PastePage_Field"}>
                            <p>Syntax Highlighting</p>
                            <select
                                onChange={(event) => {
                                    this.setState({ codeBlock: event.target.value })
                                }}
                            >
                                {Object.keys(Languages).map((language, index) => {
                                    return (
                                        <option key={index} value={Languages[language]}>{language}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className={"PastePage_Field"}>
                            <p>Expires After</p>
                            <select
                                onChange={(event) => {
                                    this.setState({ expiresAfter: parseInt(event.target.value) })
                                }}
                            >
                                {Object.keys(Durations).map((duration, index) => {
                                    return (
                                        <option key={index} value={Durations[duration]}>{duration}</option>
                                    );
                                })}
                            </select>
                        </div>

                        <button
                            className={"PastePage_Submit"}
                            onClick={this.submit.bind(this)}
                        >Submit</button>
                    </div>

                    <textarea
                        style={{ maxHeight: 600 }}
                        value={this.state.content}
                        className={"PastePage_TextBox"}
                        onKeyUp={this.adjustHeight.bind(this)}
                        onChange={(event) => {
                            this.setState({ content: event.target.value })
                        }}
                    />

                    <div className={"PastePage_Previous"}>
                        <h1 className={"text-2xl"}>Previous Pastes</h1>

                        {this.retrieveHistory().length == 0 &&
                            <p>Pastes will appear here...</p>}

                        {
                            this.retrieveHistory().map((paste, index) => {
                                return <p
                                    key={index}
                                    onClick={() => window.open(`paste/${paste.id}`, "_blank")}
                                >
                                    <b>Name:</b> {paste.name.length == 0 ?
                                    paste.id : paste.name}; <b>ID:</b> {paste.id}
                                </p>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PastePage;
