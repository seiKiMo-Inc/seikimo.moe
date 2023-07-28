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
