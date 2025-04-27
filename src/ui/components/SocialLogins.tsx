import React from "react";

import AppleLogin from "react-apple-signin-auth";

import { ReactComponent as GoogleIcon } from "@icons/google.svg";
import { ReactComponent as DiscordIcon } from "@icons/discord.svg";

import { expectedOrigin, newCall } from "@app/index";
import { getRedirectUrl, handoffCode } from "@utils/login";
import type { AppleLoginResponse } from "@backend/types";

import "@css/Account.scss";

/**
 * Opens a social login window.
 *
 * @param route The route to call.
 * @param name The name of the window.
 */
function socialLogin(route: string, name: string): void {
    const url = newCall(route);
    const authWindow = window.open(url, name, "resizable=no,toolbar=no,height=950,width=500");

    // Check if the window was spawned.
    if (authWindow == null) {
        alert("Please allow popups for this site.");
        return;
    }

    // Focus the window.
    authWindow.focus();

    waitForLogin();
}

/**
 * Adds an event listener which waits for a login response.
 */
function waitForLogin() {
    // Add a message handler.
    window.addEventListener("message", (event) => {
        // Check the event origin.
        if (event.origin != expectedOrigin()) return;

        // Fetch the token.
        const { username, token } = event.data;
        if (!username || !token) return;

        // Store the credentials in the local storage.
        const credentials = JSON.stringify({ username, token });
        localStorage.setItem("credentials", credentials);

        // Encode the credentials.
        const encoded = btoa(credentials);
        // Redirect to the redirect URL.
        window.location.replace(getRedirectUrl(handoffCode() ? encoded : undefined));
    });
}

/**
 * Invoked when the completion of an Apple login takes place.
 *
 * @param appleResponse The response from the Apple login.
 */
async function onAppleLogin(appleResponse: AppleLoginResponse) {
    const { user, authorization: { code } } = appleResponse;

    // Check if the user was specified.
    const userEncoded = user == null ? "none" : btoa(JSON.stringify(user));

    // Exchange with the backend server for a token.
    const response = await fetch(newCall(`account/login/apple?code=${code}&user=${userEncoded}`));
    if (response.status != 200) {
        alert("Failed to authenticate with Apple.");
        return;
    }

    // Store the credentials in the local storage.
    const credentials = await response.text();
    localStorage.setItem("credentials", credentials);

    // Encode the credentials.
    const encoded = btoa(credentials);
    // Redirect to the redirect URL.
    window.location.replace(getRedirectUrl(handoffCode() ? encoded : undefined));
}

interface IButtonProps {
    gap: number;
    service: string;
    onClick?: () => void;

    children: React.ReactNode | React.ReactNode[];
}

function Button(props: IButtonProps) {
    return (
        <div className={"h-[50px] flex flex-row justify-center bg-zinc-900 rounded-[5px] cursor-pointer select-none"}>
            <div
                onClick={props.onClick}
                style={{ gap: props.gap }}
                className={"flex flex-row items-center self-center"}
            >
                {props.children}
                <span className={"text-white text-xl font-medium"}>Continue with {props.service}</span>
            </div>
        </div>
    );
}

function SocialLogins() {
    return (
        <div className={"w-[340px] flex flex-col gap-[10px]"}>
            <Button
                gap={7.5}
                service={"Google"}
                onClick={() => socialLogin("account/login/google", "Authenticate with Google")}
            >
                <GoogleIcon />
            </Button>

            <Button
                gap={8}
                service={"Discord"}
                onClick={() => socialLogin("account/login/discord", "Authenticate with Discord")}
            >
                <DiscordIcon />
            </Button>

            <AppleLogin
                authOptions={{
                    clientId: import.meta.env.VITE_APPLE_CLIENT_ID ?? "",
                    redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI ?? "",
                    scope: "email name",
                    usePopup: true
                }}
                render={(props: any) => (
                    <Button
                        {...props}
                        gap={8}
                        service={"Apple"}
                    >
                        <img src={"/apple.png"} alt={"Apple Icon"} className={"w-[24px]"} />
                    </Button>
                )}
                uiType={"dark"}
                onSuccess={onAppleLogin}
                onError={(error: any) => console.error("Error when trying to login with Apple.", error)}
            />
        </div>
    );
}

export default SocialLogins;
