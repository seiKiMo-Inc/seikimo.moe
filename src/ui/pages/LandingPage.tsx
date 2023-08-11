import React from "react";

import Navigation from "@components/landing/Navigation";
import Header from "@components/landing/Header";
import OrgInfo from "@components/landing/OrgInfo";
import Footer from "@components/landing/Footer";
import MusicWidget from "@components/common/MusicWidget";
import WebChatWidget from "@components/common/WebChatWidget";

class LandingPage extends React.Component {
    componentDidMount() {
        const startLoader = document.getElementById("bars") as HTMLDivElement;
        const startBG = document.getElementById("placeholderBG") as HTMLDivElement;

        startLoader.style.display = "none";
        startBG.style.display = "none";
    }

    render() {
        return (
            <div className={"LandingPage"}>
                <Navigation />

                <Header />
                <OrgInfo />
                <Footer />

                <MusicWidget />
                <WebChatWidget />
            </div>
        );
    }
}

export default LandingPage;
