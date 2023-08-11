import React from "react";

import OrgMembers from "@components/common/OrgMembers";

import "@css/landing/OrgInfo.css";

class OrgInfo extends React.Component {
    render() {
        return (
            <div className="OrgInfo">
                <div className="OrgShapeDivider">
                    <img src="/wave.svg" alt="wave" />
                </div>

                <div className="OrgInfoDescription">
                    <p>Members</p>
                </div>

                <OrgMembers />
            </div>
        )
    }
}

export default OrgInfo;
