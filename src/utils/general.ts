/**
 * Prepares a WebSocket socket URI.
 *
 * @param route The route to the WebSocket server.
 */
export function newSocket(route: string): string {
    return import.meta ? `ws://localhost:3000/${route}` :
        `${window.isSecureContext ? "wss" : "ws"}://${window.location.host}/${route}`;
}