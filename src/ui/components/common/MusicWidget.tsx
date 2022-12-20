import React, {ReactNode} from "react";

import "@css/MusicWidget.css";

interface IState {
    isPlaying: boolean;
    hasUserInteracted: boolean;
}

class MusicWidget extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isPlaying: false,
            hasUserInteracted: false
        };
    }

    playIconSVG = (): ReactNode => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        );
    }

    pauseIconSVG = (): ReactNode => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        );
    }

    playMusic = () => {
        if (this.state.isPlaying) return;
        const audio = document.createElement("audio");
        audio.src = "bgmusic.mp3";
        audio.loop = true;
        audio.autoplay = true;
        document.body.appendChild(audio);
        audio.play().then(() => this.setState({ isPlaying: true }));
    }

    handlePlayback = async () => {
        const audio = document.querySelector("audio");
        if (audio) {
            if (this.state.isPlaying) {
                audio.pause();
                this.setState({ isPlaying: false });
            } else {
                if (!this.state.hasUserInteracted) {
                    return;
                } else {
                    await audio.play();
                    this.setState({ isPlaying: true });
                }
            }
        }
    }

    listenForUserInteraction = () => {
        document.body.onclick = () => {
            if (this.state.hasUserInteracted) return;
            this.setState({ hasUserInteracted: true });
            this.playMusic();
        }
    }

    redirectToAudioSource = () => {
        window.open("https://www.youtube.com/watch?v=8o8P_RJngss", "_blank");
    }

    componentDidMount() {
        this.listenForUserInteraction();
    }

    render() {
        return (
            <div className="MusicWidget">
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