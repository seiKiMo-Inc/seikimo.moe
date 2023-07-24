import React from "react";

import { ReactComponent as GoogleIcon } from "@icons/google.svg";

import RouterComponent from "@components/common/RouterComponent";

import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";

import "@css/LoginPage.scss";
import { sha256str } from "@utils/general";

interface IProps {
    service?: string;
    params: any;
}

interface IState {
    email: string;
    password: string;
}

class LoginPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    /**
     * Gets the service from the URL.
     */
    private getService(): string {
        return this.props.service ??
            this.props.params.srv ??
            "Account";
    }

    /**
     * Attempts to log in.
     */
    private async login(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // Prevent the form from submitting.

        console.log(this.state)
    }

    /**
     * Changes the email state.
     */
    private updateEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ email: event.target.value });
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
                            <input type={"email"} placeholder={"Email"}
                                   autoComplete={"yes"} onChange={this.updateEmail.bind(this)} />
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
