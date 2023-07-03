import React from "react";

import Header from "@components/Header";
import OrgInfo from "@components/OrgInfo";
import Footer from "@components/Footer";
import MusicWidget from "@components/common/MusicWidget";
import ChatWidget from "@components/common/ChatWidget";

class LandingPage extends React.Component {
    componentDidMount() {
        const startLoader = document.getElementById("bars") as HTMLDivElement;
        const startBG = document.getElementById("placeholderBG") as HTMLDivElement;

        startLoader.style.display = "none";
        startBG.style.display = "none";
    }

    render() {
        return (
            <div className="LandingPage">
                <Header />
                <OrgInfo />
                <Footer />
                <MusicWidget />
                <ChatWidget />
            </div>
        );
    }
}

export default LandingPage;
