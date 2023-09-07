import { newSocket } from "@utils/general";

let _rtcSocket: WebSocket | null = null;
let _chatSocket: WebSocket | null = null;
let _webChatSocket: WebSocket | null = null;

/**
 * Gets the WebSocket for the RTC part of the chat server.
 *
 * @param conversation The conversation ID.
 */
export function rtcSocket(conversation: string): WebSocket {
    return _rtcSocket ?? reconnect(_rtcSocket,
        (socket) => _rtcSocket = socket,
        () => _rtcSocket = new WebSocket(newSocket(`chat/rtc/${conversation}`))
    );
}

/**
 * Gets the WebSocket for the chat server.
 */
export function chatSocket(): WebSocket {
    return _chatSocket ?? reconnect(_chatSocket,
        (socket) => _chatSocket = socket,
        () => _chatSocket = new WebSocket(newSocket("chat/gateway"))
    );
}

/**
 * Gets the WebSocket for the landing page chat server.
 */
export function webChatSocket(): WebSocket {
    return _webChatSocket ?? reconnect(_webChatSocket,
        (socket) => _webChatSocket = socket,
        () => _webChatSocket = new WebSocket(newSocket("webchat"))
    );
}

/**
 * Automatically reconnects a WebSocket.
 *
 * @param current The current WebSocket.
 * @param set The WebSocket to reconnect.
 * @param factory The factory function to create a new WebSocket.
 * @param died Did the WebSocket die?
 */
export function reconnect(
    current: WebSocket | null,
    set: (socket: WebSocket) => void,
    factory: () => WebSocket,
    died: boolean = false
): WebSocket {
    if (current) {
        current.onclose = () => reconnect(current, set, factory, true);
    }

    if (died) {
        // Create a new WebSocket.
        set(factory());
    }

    return current ?? factory();
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

/**
 * Wraps the WebSocket in a class.
 *
 * @param socket The WebSocket to wrap.
 */
export function asSocket(socket: WebSocket): Socket {
    return new Socket(socket);
}

export class Socket {
    constructor(
        public readonly handle: WebSocket
    ) {}

    /**
     * Setter for the 'onmessage' WebSocket event.
     *
     * @param handler The handler to set.
     */
    set onmessage(handler: (event: MessageEvent) => void) {
        this.handle.onmessage = handler;
    }

    /**
     * Method for sending data to the server.
     *
     * @param data The data to send.
     */
    send(data: string | object): void {
        if (typeof data == "string") {
            this.handle.send(data);
        } else {
            this.handle.send(JSON.stringify(data));
        }
    }
}
