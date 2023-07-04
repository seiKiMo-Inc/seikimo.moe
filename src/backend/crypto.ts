import { base64Encode } from "@utils/general";

/**
 * Generates a random encryption key.
 */
export async function generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey({
        name: "AES-GCM", length: 256
    }, true, ["encrypt", "decrypt"]);
}

/**
 * Converts a key to a string.
 *
 * @param key The key to convert.
 */
export async function exportKey(key: CryptoKey): Promise<string> {
    return base64Encode(await crypto.subtle.exportKey("raw", key));
}

/**
 * Encrypts a file using the given key.
 *
 * @param file The file to encrypt.
 * @param key The key to encrypt the file with.
 */
export async function encrypt(file: ArrayBuffer, key: CryptoKey): Promise<Blob> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({
        name: "AES-GCM", iv: iv
    }, key, file);

    return new Blob([iv, new Uint8Array(encrypted)]);
}

/**
 * Decrypts a file using the given key.
 *
 * @param file The file to decrypt.
 * @param key The key to decrypt the file with.
 */
export async function decrypt(file: ArrayBuffer, key: CryptoKey): Promise<Blob> {
    // Convert the file to a blob.
    const blob = await new Blob([file]).arrayBuffer();
    const iv = blob.slice(0, 12);
    const encrypted = blob.slice(12);

    const decrypted = await crypto.subtle.decrypt({
        name: "AES-GCM", iv: iv
    }, key, encrypted);

    return new Blob([decrypted]);
}
