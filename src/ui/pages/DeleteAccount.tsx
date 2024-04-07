import { expectedOrigin, newCall } from "@app/index";
import { useState } from "react";

function DeleteAccount() {
    const url = `${expectedOrigin()}/account/delete`;

    const [status, setStatus] = useState<string | null>(null);

    return (
        <div className={"flex flex-col p-5"}>
            <span>To delete your account, click the button below.</span>
            { status && (
                <span>{status}</span>
            ) }
            <span
                className={"px-2 py-1 bg-blue-500 w-fit hover:cursor-pointer"}
                onClick={async () => {
                    // Check if the credentials are stored.
                    const creds = localStorage.getItem("credentials");
                    if (!creds) {
                        window.open(`${expectedOrigin()}/login?redirect=${url}&app=Delete Account&handoff=true`);
                        setStatus("Follow the link to delete your account.");
                    } else try {
                        // Parse the credentials.
                        const { token } = JSON.parse(creds);
                        // Attempt to delete the account.
                        const response = await fetch(newCall("account"), {
                            method: "DELETE",
                            headers: { Authorization: token }
                        });

                        if (response.status == 200) {
                            setStatus("Account deleted successfully.");

                            // Remove the credentials.
                            localStorage.removeItem("credentials");
                        } else {
                            setStatus("Unable to delete account Please contact us at support@seikimo.moe.");
                        }
                    } catch (error) {
                        window.open(`${expectedOrigin()}/login?redirect=${url}&app=Delete Account&handoff=true`);
                        setStatus("Follow the link to delete your account.");
                    }
                }}
            >
                Delete Account
            </span>
        </div>
    );
}

export default DeleteAccount;
