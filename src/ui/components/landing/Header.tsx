import React from "react";

import { scrollTo } from "@utils/general";
import { defaultDensity, spawnSnow, spawnSnowCSS } from "@utils/pureSnow";

import "@css/landing/Header.css";

class Header extends React.Component {
    render() {
        return (
            <div
                className="Header"
                onLoad={() => {
                    spawnSnow(defaultDensity, document.getElementById("snow") as HTMLDivElement);
                    spawnSnowCSS(defaultDensity, "Header");
                }}
            >
                <div id="snow"></div>
                <div className="HeaderBackground" />

                <div className="HeaderContent">
                    <div className="HeaderLogo">
                        <img src="/seikimo.png" alt="seiKiMo" />
                    </div>
                    <div className="HeaderByline">
                        <p>Stupid Dumbasses Make Based Software</p>
                    </div>
                </div>

                <div className={"HeaderScroll"}
                     onClick={() => scrollTo("orgInfo")}
                >
                    <svg>
                        <path className="ScrollArrow1" d="M0 0 L30 32 L60 0" />
                        <path className="ScrollArrow2" d="M0 20 L30 52 L60 20" />
                        <path className="ScrollArrow3" d="M0 40 L30 72 L60 40" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default Header;
