import React from "react";

import { MdLaunch } from "react-icons/md";

import Navigation from "@components/landing/Navigation";
import Header from "@components/landing/Header";
import OrgInfo from "@components/landing/OrgInfo";
import Footer from "@components/landing/Footer";
import MusicWidget from "@components/common/MusicWidget";
import WebChatWidget from "@components/common/WebChatWidget";

import { Mobile } from "@backend/types";
import { getMobilePlatform, isOnMobile } from "@utils/general";

import "@css/pages/LandingPage.scss";

function Laudiolin() {
    return (
        <div id={"laudiolin"} className={"LandingPage_Segment LandingPage_Laudiolin"}>
            <div className={"LandingPage_Container"}
                 style={{ background: "linear-gradient(90deg, transparent, #4d7bd6)" }}
            >
                <img
                    className={"LandingPage_Image"}
                    src={"laudiolin.png"}
                    alt={"Laudiolin"}
                />

                <div className={"LandingPage_TextContainer"}
                     style={{ alignItems: "end", textAlign: "end", marginLeft: "50%" }}
                >
                    <h1>Laudiolin</h1>

                    <div className={"LandingPage_Description"}>
                        <p>
                            Laudiolin is an open source audio player for
                            Windows, Linux, the web, and mobile platforms.
                        </p>
                        <p>
                            It acts as a drop-in replacement for whatever
                            audio source you're currently using, and supports
                            importing playlists from other audio players.
                        </p>
                    </div>

                    <div className={"LandingPage_Buttons"}>
                        <div className={"LandingPage_Open"}
                             onClick={() => {
                                 if (isOnMobile()) {
                                     // Launch the respective download links.
                                     switch (getMobilePlatform()) {
                                         case Mobile.iOS:
                                             window.open("https://testflight.apple.com/join/dKGTNWB4");
                                             return;
                                         case Mobile.Android:
                                             window.open("https://seikimo.moe/laudiolin.apk");
                                             return;
                                     }
                                 } else {
                                     // Launch the desktop app.
                                     window.open("https://laudiolin.seikimo.moe");
                                 }
                             }}
                        >
                            <MdLaunch />

                            <p>Open</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                {/*<Navigation />*/}

                <Header />
                <Laudiolin />
                <OrgInfo />
                <Footer />

                <MusicWidget />
                {/*<WebChatWidget />*/}
            </div>
        );
    }
}

export default LandingPage;
