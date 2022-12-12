import React from "react";

import { spawnSnow, spawnSnowCSS } from "@utils/pureSnow";

import "@css/Header.css";

class Header extends React.Component {
    render() {
        return (
            <div
                className="Header"
                onLoad={() => {
                    spawnSnow(200, (document.getElementById("snow") as HTMLDivElement));
                    spawnSnowCSS();
                }}
            >
                <div id="snow"></div>
                <div className="HeaderBackground" />
                <div className="HeaderContent">
                    <div className="HeaderLogo">
                        <img src="seikimo.png" alt="seiKiMo" />
                    </div>
                    <div className="HeaderByline">
                        <p>Stupid Dumbasses Make Based Software</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;