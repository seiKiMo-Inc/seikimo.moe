import React from "react";

import { ReactComponent as GoogleIcon } from "@icons/google.svg";

import RouterComponent from "@components/common/RouterComponent";

import { newCall } from "@app/index";
import { sha256str } from "@utils/general";
import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";
import type { AccountCredentials } from "@backend/types";

import "@css/LoginPage.scss";

interface IProps {
    params: any;
}

interface IState {
    username: string;
    password: string;
}

class LoginPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    /**
     * Gets the service from the URL.
     */
    private getService(): string {
        const url = new URL(window.location.href);
        const appName = url.searchParams.get("app");

        return appName ?? this.props.params.srv ?? "Account";
    }

    /**
     * Reads the 'redirect' query parameter.
     * Defaults to 'seikimo.moe/'.
     */
    private getRedirectUrl(): string {
        const url = new URL(window.location.href);
        const redirect = url.searchParams.get("redirect");

        return redirect ?? "https://seikimo.moe/";
    }

    /**
     * Attempts to log in.
     */
    private async login(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // Prevent the form from submitting.

        try {
            const response = await fetch(newCall("account/login"), {
                method: "POST", body: JSON.stringify(this.state)
            });

            // Check if the login was successful.
            if (response.status != 200) {
                // TODO: Display login error.
                return;
            }

            // Parse the response.
            const data = await response.json() as AccountCredentials;
            // Store the credentials in the session.
            localStorage.setItem("credentials", JSON.stringify(data));

            // Redirect to the redirect URL.
            window.location.href = this.getRedirectUrl();
        } catch (e) {
            // TODO: Display login error.
        }
    }

    /**
     * Changes the username state.
     */
    private updateUsername(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ username: event.target.value });
    }

    /**
     * Changes the password state.
     * Automatically hashes the password.
     */
    private async updatePassword(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        this.setState({ password: await sha256str(event.target.value) });
    }

    componentDidMount() {
        window.onload = () => {
            spawnSnow(defaultDensity, document.getElementById("snow") as HTMLDivElement);
            spawnSnowCSS(defaultDensity, "LoginPage");
        };
    }

    render() {
        return (
            <div className={"LoginPage"}>
                <div className={"LoginPage_Background"}>
                    <div id={"snow"} />
                </div>

                <div className={"LoginPage_Container"}>
                    <div className={"LoginPage_Header"}>
                        <p>Sign in</p>
                        <p>to continue to {this.getService()}</p>
                    </div>

                    <div className={"LoginPage_Form"}>
                        <form onSubmit={this.login.bind(this)}>
                            <input type={"text"} placeholder={"Username/Email"}
                                   autoComplete={"yes"} onChange={this.updateUsername.bind(this)} />
                            <input type={"password"} placeholder={"Password"}
                                   autoComplete={"yes"} onChange={this.updatePassword.bind(this)} />
                            <button>Log in</button>
                        </form>
                    </div>

                    <div className={"LoginPage_Divider"}>
                        <div className={"LoginPage_Line"}></div>
                        OR
                        <div className={"LoginPage_Line"}></div>
                    </div>

                    <div className={"LoginPage_External"}>
                        <div className={"LoginPage_Button"}>
                            <div className={"flex flex-row items-center self-center gap-[5.5px]"}>
                                <GoogleIcon />
                                <p>Continue with Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RouterComponent(LoginPage);
