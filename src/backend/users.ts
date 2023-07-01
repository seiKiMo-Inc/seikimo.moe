import { Member } from '@backend/types'

const MEMBERS_URL = import.meta ? `http://localhost:3000/org` : `${window.location.href}org`;

export async function getAllMembers(): Promise<Member[]> {
    const response = await fetch(MEMBERS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await response.json();
}