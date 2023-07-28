import type { AccountCredentials, Member } from "@backend/types";
import { isDevelopment } from "@app/index";

const MEMBERS_URL = isDevelopment() ? `http://localhost:3000/org` : `${window.location.href}org`;

/**
 * Gets the account credentials from the local storage.
 */
export function getCredentials(): AccountCredentials {
    try {
        const credentials = localStorage.getItem("credentials");
        return credentials ? JSON.parse(credentials) : { username: "", token: "" };
    } catch (error) {
        console.error(error);
        return { username: "", token: "" };
    }
}

/**
 * Fetches all members in the GitHub organization.
 */
export async function getAllMembers(): Promise<Member[]> {
    const response = await fetch(MEMBERS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await response.json();
}
