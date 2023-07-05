import { Member } from "@backend/types";
import { isDevelopment } from "@app/index";

const MEMBERS_URL = isDevelopment() ? `http://localhost:3000/org` : `${window.location.href}org`;

export async function getAllMembers(): Promise<Member[]> {
    const response = await fetch(MEMBERS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await response.json();
}
