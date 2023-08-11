import React from "react";

import "@css/landing/Footer.css";

class Footer extends React.Component {
    sendToGithub = () => {
        window.open("https://github.com/seiKiMo-Inc", "_blank");
    }

    render() {
        return (
            <div className="Footer">
                <div className="FooterDivider"></div>
                <div className="FooterContent">
                    <p className="FooterCopyright">
                        © 2023 seiKiMo-Inc.
                    </p>
                    <img className="FooterGithubButton" src="github-button.png" alt="Github button" onClick={this.sendToGithub} />
                </div>
            </div>
        );
    }
}

export default Footer;
