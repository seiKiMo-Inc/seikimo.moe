import React from 'react';

import Header from "@components/Header";
import OrgInfo from "@components/OrgInfo";
import Footer from "@components/Footer";
import MusicWidget from "@components/common/MusicWidget";

import '@css/App.css';

class App extends React.Component {
    async componentDidMount() {
        const startLoader = document.getElementById("bars") as HTMLDivElement;
        const startBG = document.getElementById("placeholderBG") as HTMLDivElement;

        startLoader.style.display = "none";
        startBG.style.display = "none";
    }

    render() {
        return (
            <div className="App">
                <Header />
                <OrgInfo />
                <Footer />
                <MusicWidget />
            </div>
        );
    }
}

export default App;
