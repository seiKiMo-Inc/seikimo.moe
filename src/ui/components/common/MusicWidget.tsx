import React, { ReactNode } from "react";

import "@css/components/MusicWidget.css";

interface IState {
    isPlaying: boolean;
}

class MusicWidget extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isPlaying: false
        };
    }

    playIconSVG = (): ReactNode => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        );
    };

    pauseIconSVG = (): ReactNode => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        );
    };

    playMusic = () => {
        if (this.state.isPlaying) return;

        // Get the element to add the audio element to.
        const musicWidget = document.getElementById("music");
        if (!musicWidget) return;

        // Create the audio element.
        const audio = document.createElement("audio");
        audio.src = "bgmusic.mp3";
        audio.loop = true;
        audio.autoplay = true;
        audio.volume = 0.3;

        // Play the audio.
        musicWidget.appendChild(audio);
        audio.play().then(() => this.setState({ isPlaying: true }));

        // Set the widget.
        const anyWindow = window as any;
        anyWindow.musicWidget = audio;
    };

    handlePlayback = async () => {
        const audio = (window as any).musicWidget;
        if (audio && audio instanceof HTMLAudioElement) {
            if (this.state.isPlaying) {
                audio.pause();
                this.setState({ isPlaying: false });
            } else {
                await audio.play();
                this.setState({ isPlaying: true });
            }
        }
    };

    listenForUserInteraction = () => {
        document.body.onclick = () => {
            const anyWindow = window as any;
            if (anyWindow.musicWidget) return;

            this.playMusic();
        };
    };

    redirectToAudioSource = () => {
        window.open("https://www.youtube.com/watch?v=8o8P_RJngss", "_blank");
    };

    componentDidMount() {
        // Wait for the user to interact with the page before playing music.
        this.listenForUserInteraction();
    }

    componentWillUnmount() {
        document.body.onclick = null;

        // Remove the audio element.
        const audio = (window as any).musicWidget;
        if (audio && audio instanceof HTMLAudioElement) {
            audio.pause();
            audio.remove();
        }
    }

    render() {
        return (
            <div id={"music"} className="MusicWidget">
                <div className="MusicWidgetPlayButton" onClick={this.handlePlayback}>
                    <div className="MusicWidgetPlayButtonSVG">
                        {this.state.isPlaying ? this.pauseIconSVG() : this.playIconSVG()}
                    </div>
                </div>

                <div className="MusicWidgetDetails">
                    <p className="MusicWidgetTitle" onClick={this.redirectToAudioSource}>Replica [レプリカ]</p>
                    <p className="MusicWidgetArtist">Keigo Hoashi</p>
                </div>
            </div>
        );
    }
}

export default MusicWidget;
