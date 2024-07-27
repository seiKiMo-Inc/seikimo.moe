import React, { FormEvent, HTMLInputTypeAttribute, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Turnstile, { useTurnstile } from "react-turnstile";

import OrDivider from "@components/OrDivider";
import SocialLogins from "@components/SocialLogins";

import { newCall } from "@app/index";
import { getRedirectUrl } from "@utils/login";
import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";
import { AccountCredentials } from "@backend/types";

import "@css/Account.scss";
import TurnstileWidget from "@components/TurnstileWidget";

interface SubmitData {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

interface AccountCreateResponse {
    message?: string;
    creds?: AccountCredentials;
}

/**
 * Invoked when the user submits the sign-up form.
 */
async function onSubmit(
    event: FormEvent<HTMLFormElement>,
    token: string,
    { username, email, password, confirm }: SubmitData
): Promise<boolean> {
    event.preventDefault();

    if (password !== confirm) {
        throw new Error("Passwords do not match.");
    }

    const response = await fetch(newCall("account/create"), {
        method: "POST", body: JSON.stringify({ token, username, email, password })
    });

    // Parse the response.
    const data = await response.json() as AccountCreateResponse;
    if (data.message) {
        throw new Error(data.message);
    }

    // Store the credentials.
    localStorage.setItem("credentials", JSON.stringify(data));

    return true;
}

/**
 * Gets the service from the URL.
 */
function getService(params: any): string {
    const url = new URL(window.location.href);
    const appName = url.searchParams.get("app");

    return appName ?? params?.srv ?? "Account";
}

interface IInputProps {
    type: HTMLInputTypeAttribute;
    onChange?: (value: string) => void;

    children: string;
}

function Input(props: IInputProps) {
    return (
        <input
            type={props.type}
            autoComplete={"no"}
            placeholder={props.children}
            onChange={(event) => {
                props.onChange?.(event.target.value);
            }}
        />
    );
}

function SignupPage() {
    const turnstile = useTurnstile();
    const params = useParams();

    const [token, setToken] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    useEffect(() => {
        const snowDiv = document.getElementById("snow") as HTMLDivElement;

        spawnSnow(defaultDensity, snowDiv);
        spawnSnowCSS(defaultDensity, "SignupPage");

        return () => {
            // Clear the children of the snow div.
            snowDiv.innerHTML = "";
        };
    }, []);

    return (
        <div className={"SignupPage"}>
            <div className={"background"}>
                <div id={"snow"} />
            </div>

            <div className={"Account_Container"}>
                <div className={"flex flex-col items-center gap-[10px] h-[70px] mb-4"}>
                    <span className={"text-[30px] font-medium leading-[35px]"}>Sign up</span>
                    <span className={"text-lg font-medium"}>to continue to {getService(params)}</span>
                </div>

                <div className={"Account_Form"}>
                    <form onSubmit={async (e) => {
                        try {
                            const result = await onSubmit(
                                e, token, { username, email, password, confirm });
                            if (!result) {
                                // noinspection ExceptionCaughtLocallyJS
                                throw new Error("An error occurred while signing up. Please try again later.");
                            }

                            // Redirect to the redirect URL.
                            window.location.replace(getRedirectUrl());
                        } catch (error) {
                            setError(error instanceof Error ?
                                error.message :
                                "An error occurred while signing up. Please try again later.");
                            setTimeout(() => setError(null), 5000);
                        }

                        turnstile.reset();
                    }}>
                        <Input type={"text"} onChange={setUsername}>Username</Input>
                        <Input type={"email"} onChange={setEmail}>Email Address</Input>
                        <Input type={"password"} onChange={setPassword}>Password</Input>
                        <Input type={"password"} onChange={setConfirm}>Confirm Password</Input>
                        <button className={"!text-2xl !font-medium"}>Sign up</button>
                    </form>
                </div>

                <TurnstileWidget setToken={setToken} />

                { error && <span className={"text-red-500 mb-2.5"}>{error}</span> }

                <Link className={"text-sm mb-1 hover:underline"}
                      to={{ pathname: "/account/login", search: location.search }}
                >
                    Already have an account? Log in!
                </Link>

                <OrDivider />

                <SocialLogins />
            </div>
        </div>
    );
}

export default SignupPage;
