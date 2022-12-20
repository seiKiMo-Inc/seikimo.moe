import { Member } from '@backend/types'

export async function getAllMembers(): Promise<Member[]> {
    const response = await fetch(`https://api.arikatsu.lol/org`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return await response.json();
}