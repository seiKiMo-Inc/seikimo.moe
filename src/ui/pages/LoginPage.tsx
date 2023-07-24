import React from "react";

import { ReactComponent as GoogleIcon } from "@icons/google.svg";

import RouterComponent from "@components/common/RouterComponent";

import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";

import "@css/LoginPage.scss";

interface IProps {
    service?: string;
    params: any;
}

interface IState {

}

class LoginPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    /**
     * Gets the service from the URL.
     */
    private getService(): string {
        return this.props.service ??
            this.props.params.srv ??
            "Account";
    }

    componentDidMount() {
        spawnSnow(defaultDensity, document.getElementById("snow") as HTMLDivElement);
        spawnSnowCSS(defaultDensity, "LoginPage");
    }

    render() {
        return (
            <div className={"LoginPage"}>
                <div className={"LoginPage_Background"}>
                    <div id={"snow"} />
                </div>

                <div className={"LoginPage_Container"}>
                    <div className={"LoginPage_Header"}>
                        <p className={"h-[35px]"}>Sign in</p>
                        <p>to continue to {this.getService()}</p>
                    </div>

                    <div className={"LoginPage_Form"}>
                        <input type={"email"} placeholder={"Email"} />
                        <input type={"password"} placeholder={"Password"} />
                        <button>Log in</button>
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
