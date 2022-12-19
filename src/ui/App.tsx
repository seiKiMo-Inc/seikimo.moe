import React from 'react';

import Header from "@components/Header";
import OrgInfo from "@components/OrgInfo";
import Footer from "@components/Footer";

import '@css/App.css';

class App extends React.Component {
    static isMusicPlaying: boolean = false;

    // This will fail because the user needs to interact with the DOM before playing audio.
    // I'll think of another way for audio to play.
    appendMusic = async () => {
        if (App.isMusicPlaying) return;
        const audio = document.createElement("audio");
        audio.src = "bgmusic.mp3";
        audio.loop = true;
        audio.autoplay = true;
        document.body.appendChild(audio);
        await audio.play();
    }

    async componentDidMount() {
        const startLoader = document.getElementById("bars") as HTMLDivElement;
        const startBG = document.getElementById("placeholderBG") as HTMLDivElement;
        startLoader.style.display = "none";
        startBG.style.display = "none";

        // await this.appendMusic().then(() => App.isMusicPlaying = true);
    }

    render() {
        return (
            <div className="App">
                <Header />
                <OrgInfo />
                <Footer />
            </div>
        );
    }
}

export default App;
