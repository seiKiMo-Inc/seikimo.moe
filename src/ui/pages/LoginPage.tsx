import React from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
import { Link, useParams } from "react-router-dom";

import OrDivider from "@components/OrDivider";
import SocialLogins from "@components/SocialLogins";

import { newCall } from "@app/index";
import { getRedirectUrl } from "@utils/login";
import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";
import type { AccountCredentials } from "@backend/types";

import { TurnstileObject } from "turnstile-types";

import "@css/Account.scss";
import "@css/pages/LoginPage.scss";

interface IProps {
    params: any;
    turnstile: TurnstileObject;
}

interface IState {
    username: string;
    password: string;
    token: string;

    status: string | null;
}

class LoginPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            token: "",
            status: null
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
                this.setState({ status: "Invalid account. Double-check the username & password!" });
                setTimeout(() => this.setState({ status: null }), 5000);
                return;
            }

            // Parse the response.
            const data = await response.json() as AccountCredentials;
            // Store the credentials in the session.
            localStorage.setItem("credentials", JSON.stringify(data));

            // Redirect to the redirect URL.
            window.location.replace(getRedirectUrl());
        } catch (e) {
            this.setState({ status: "An error occurred while logging in. Please try again later." });
            setTimeout(() => this.setState({ status: null }), 5000);
        }

        this.props.turnstile.reset();
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
        this.setState({ password: event.target.value });
    }

    componentDidMount() {
        spawnSnow(defaultDensity, document.getElementById("snow") as HTMLDivElement);
        spawnSnowCSS(defaultDensity, "LoginPage");
    }

    render() {
        return (
            <div className={"LoginPage"}>
                <div className={"background"}>
                    <div id={"snow"} />
                </div>

                <div className={"Account_Container"}>
                    <div className={"LoginPage_Header"}>
                        <p>Sign in</p>
                        <p>to continue to {this.getService()}</p>
                    </div>

                    <div className={"Account_Form"}>
                        <form onSubmit={this.login.bind(this)}>
                            <input type={"text"} placeholder={"Username/Email"}
                                   autoComplete={"yes"} onChange={this.updateUsername.bind(this)} />
                            <input type={"password"} placeholder={"Password"}
                                   autoComplete={"yes"} onChange={this.updatePassword.bind(this)} />
                            <button className={"!text-2xl !font-medium"}>Log in</button>
                        </form>
                    </div>

                    <Turnstile
                        sitekey={import.meta.env.VITE_TURNSTILE_KEY}
                        onVerify={(token) => this.setState({ token })}
                    />

                    { this.state.status && (
                        <span className={"text-red-500 mb-2.5"}>
                            {this.state.status}
                        </span>
                    )}

                    <Link className={"text-sm mb-1 hover:underline"} to={"/account/signup"}>
                        Don't have an account? Sign up!
                    </Link>

                    <OrDivider />

                    <SocialLogins />
                </div>
            </div>
        );
    }
}

const Wrap = (WrappedComponent: any) => (props: any) => {
    const turnstile = useTurnstile();
    const params = useParams();

    return <WrappedComponent {...props} params={params} turnstile={turnstile} />;
};

export default Wrap(LoginPage);
