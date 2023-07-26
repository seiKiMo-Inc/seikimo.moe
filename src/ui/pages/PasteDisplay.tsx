import React from "react";

import highlightjs from "highlight.js";

import RouterComponent from "@components/common/RouterComponent";

import { newCall } from "@app/index";
import type { Paste } from "@backend/types";

import "@css/components/PasteDisplay.scss";

interface IProps {
    params: any;
}

interface IState {
    paste: Paste | null;
}

class PasteDisplay extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            paste: null
        };
    }

    /**
     * Gets the paste ID from the URL.
     */
    private getId(): string {
        return this.props.params.id;
    }

    /**
     * Resolves a paste from the ID.
     */
    private async resolvePaste(): Promise<void> {
        const id = this.getId();
        const response = await fetch(newCall(`paste/${id}/json`), {
            method: "GET", headers: { "Authorization": "" }
        });

        if (response.status == 200) {
            this.setState({
                paste: await response.json() as Paste
            });
        }
    }

    componentDidMount() {
        this.resolvePaste()
            .then(() => highlightjs.highlightAll())
            .catch(err => console.error(err));
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (prevProps.params.id !== this.props.params.id) {
            this.resolvePaste()
                .then(() => highlightjs.highlightAll())
                .catch(err => console.error(err));
        }
    }

    render() {
        const language: string = this.state.paste?.codeType ?? "plaintext";

        return (
            <div className={"PasteDisplay"}>
                <div className={"PasteDisplay_Title"}>
                    <p className={"text-4xl"}>seiKiMo Pastes</p>
                    <p className={"text-xl"}>Simple & swift text sharing.</p>
                </div>

                <div
                    className={"PasteDisplay_Content"}
                >
                    <pre><code
                        className={language == "auto" || language.length == 0 ?
                            undefined : `language-${language}`}
                        style={{
                            overflowX: language == "plaintext" ?
                                "auto" : "scroll",
                            overflowWrap: language == "plaintext" ?
                                "break-word" : "normal"
                        }}
                    >
                        {this.state.paste && this.state.paste?.content}
                    </code></pre>
                </div>
            </div>
        );
    }
}

export default RouterComponent(PasteDisplay);
