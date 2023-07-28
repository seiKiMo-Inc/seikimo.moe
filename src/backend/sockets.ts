import { newSocket } from "@utils/general";

let _chatSocket: WebSocket | null = null;
let _webChatSocket: WebSocket | null = null;

/**
 * Gets the WebSocket for the chat server.
 */
export function chatSocket(): WebSocket {
    return _chatSocket ?? (_chatSocket = new WebSocket(newSocket("chat/gateway")));
}

/**
 * Gets the WebSocket for the landing page chat server.
 */
export function webChatSocket(): WebSocket {
    return _webChatSocket ?? (_webChatSocket = new WebSocket(newSocket("webchat")));
}

/**
 * Encodes a packet to be sent to the server.
 *
 * @param packetId The ID of the packet.
 * @param data The data to send.
 */
export function encode(packetId: number, data: Uint8Array): Uint8Array {
    const buffer = new ArrayBuffer(8 + data.byteLength);
    const view = new DataView(buffer);

    // Write the packet data.
    view.setUint32(0, packetId);
    view.setUint32(4, data.byteLength);
    new Uint8Array(buffer, 8).set(data);

    return new Uint8Array(buffer);
}
