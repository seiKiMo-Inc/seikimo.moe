import { isDevelopment } from "@app/index";

/**
 * Prepares a WebSocket socket URI.
 *
 * @param route The route to the WebSocket server.
 */
export function newSocket(route: string): string {
    return isDevelopment() ? `ws://localhost:3000/${route}` :
        `${window.isSecureContext ? "wss" : "ws"}://${window.location.host}/${route}`;
}

/**
 * Converts a byte size to a human-readable string.
 * (maybe) Made by https://stackoverflow.com/a/18650828
 *
 * @param bytes The byte size to convert.
 */
export function bytesToSize(bytes: number): string {
    const sizes = ["bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 bytes";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Number(bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

/**
 * Base64-encodes a buffer.
 *
 * @param buffer The buffer to encode.
 */
export function base64Encode(buffer: ArrayBuffer): string {
    let base64 = "";
    const encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    const bytes = new Uint8Array(buffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    let a, b, c, d;
    let chunk;

    // Main loop deals with bytes in chunks of 3
    for (let i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
}

/**
 * Checks if the user is on a mobile device.
 */
export function isOnMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Performs a SHA256 operation on a string or buffer.
 *
 * @param data The data to hash.
 */
export async function sha256(data: ArrayBuffer | string): Promise<ArrayBuffer> {
    return await crypto.subtle.digest("SHA-256",
        data instanceof ArrayBuffer ?
            data : new TextEncoder().encode(data));
}

/**
 * Performs a SHA256 operation on a string.
 * Converts the result into a hex string.
 *
 * @param data The data to hash.
 */
export async function sha256str(data: string): Promise<string> {
    return Array.from(new Uint8Array(await sha256(data)))
        .map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Applies utility functions to the window object.
 */
export function applyToWindow(): void {
    const win = window as any;

    win.sha256 = sha256;
    win.sha256str = sha256str;
    win.base64Encode = base64Encode;
}
