import { Member } from '@backend/types';
import { Constants } from "@backend/constants";

export async function getAllMembers(): Promise<Member[]> {
    const response = await fetch(`https://api.github.com/orgs/${Constants.orgName}/members`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    });
    return await response.json()
}