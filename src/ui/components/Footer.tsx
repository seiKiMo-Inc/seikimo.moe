import React from "react";

import "@css/Footer.css";

class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <div className="FooterDivider"></div>
                <div className="FooterContent">
                    <p className="FooterCopyright">
                        © 2023 seiKiMo-Inc.
                    </p>
                    <img className="FooterGithubButton" src="github-button.png" alt="Github button" />
                </div>
            </div>
        );
    }
}

export default Footer;