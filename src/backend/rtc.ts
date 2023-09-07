import { asSocket, rtcSocket, Socket } from "@backend/sockets";

const constraints: MediaStreamConstraints = {
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
    },
    video: {
        width: 1280, height: 720,
        frameRate: { ideal: 15, max: 30 }
    }
};

const config: RTCConfiguration = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

/**
 * Enables voice calling.
 *
 * @param client The WebRTC client.
 */
export async function voiceCall(client: WebRTC): Promise<void> {
    // Get a voice stream.
    const stream = await navigator.mediaDevices
        .getUserMedia({ audio: constraints.audio });

    // Add the stream's tracks to the peer connection.
    stream.getTracks().forEach(track => {
        client.peer.addTrack(track, stream);
    });
}

/**
 * Enables video calling.
 *
 * @param client The WebRTC client.
 */
export async function videoCall(client: WebRTC): Promise<void> {
    // Get a video stream.
    const stream = await navigator.mediaDevices
        .getUserMedia({ video: constraints.video });

    // Add the stream's tracks to the peer connection.
    stream.getTracks().forEach(track => {
        client.peer.addTrack(track, stream);
    });
}

export class WebRTC {
    readonly peer: RTCPeerConnection
        = new RTCPeerConnection(config);
    readonly signaling: Socket;

    constructor(
        readonly id: string
    ) {
        // Create the signaling client.
        this.signaling = asSocket(rtcSocket(this.id));

        this.configure();
    }

    /**
     * Sets the callback for when a track is received.
     *
     * @param callback The callback.
     */
    set ontrack(callback: (event: RTCTrackEvent) => void) {
        this.peer.ontrack = callback;
    }

    /**
     * Configures the peer & signaling server.
     */
    private configure(): void {
        const { peer, signaling } = this;

        // Prepare the peer connection.
        peer.onicecandidate = ({ candidate }) => signaling.send({ candidate });
        peer.onnegotiationneeded = this.offer.bind(this);

        // Prepare the signaling server.
        signaling.onmessage = this.handleOffer.bind(this);
    }

    /**
     * Offers a connection to the peer.
     */
    private async offer(): Promise<void> {
        try {
            // Create an offer & set as the description.
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);

            // Broadcast this offer to the signaling server.
            this.signaling.send({ desc: offer });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Handles an offer from the signaling server.
     *
     * @param event The message event.
     */
    private async handleOffer(event: MessageEvent): Promise<void> {
        const { peer, signaling } = this;
        const { desc, candidate } = JSON.parse(event.data);

        try {
            if (desc) {
                // If you get an offer, you need to reply with an answer.
                if (desc.type === "offer") {
                    // Accept the connection offer.
                    await peer.setRemoteDescription(desc);
                    // Add the local user's media sources.
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    stream.getTracks().forEach(track => peer.addTrack(track, stream));
                    // Create an answer and reply with it.
                    await peer.setLocalDescription(await peer.createAnswer());
                    signaling.send({ desc: peer.localDescription });
                } else if (desc.type === "answer") {
                    await peer.setRemoteDescription(desc);
                } else {
                    console.log("Unsupported SDP type.");
                }
            } else if (candidate) {
                await peer.addIceCandidate(candidate);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
