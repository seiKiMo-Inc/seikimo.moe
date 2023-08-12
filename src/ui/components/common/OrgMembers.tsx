import React from "react";

import { Tooltip } from "react-tooltip";

import { getAllMembers } from "@backend/user";
import { Member, Owners } from "@backend/types";

import "@css/landing/OrgInfo.scss";

interface IState {
    members: Member[];
}

class OrgMembers extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            members: [],
        };
    }

    openMemberGithub = (member: Member) => {
        window.open(`https://github.com/${member.login}`, "_blank");
    }

    handleScrollAnimation = () => {
        const elements = Array.from(document.getElementsByClassName("OrgInfoMember"));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        });

        elements.forEach((element) => {
            io.observe(element);
        });
    }

    componentDidMount() {
        getAllMembers().then((members) => {
            this.setState({ members });
        });
    }

    componentDidUpdate() {
        this.handleScrollAnimation();
    }

    render() {
        return (
            <div className={"OrgInfoMembersList"}>
                {this.state.members.map((member, index) => (
                    <div className={"OrgInfoMember"} key={member.id}
                         style={{ transitionDelay: `${index * 100}ms` }}
                         onClick={() => this.openMemberGithub(member)}
                    >
                        <div className={"OrgInfoMemberImage"}>
                            <img
                                src={member.avatarUrl} alt={member.displayName}
                                style={{
                                    borderColor: Owners.includes(member.login) ? "#ffff55" : "#2994D1",
                                }}
                            />
                        </div>

                        <div className={"OrgInfoMemberName"}
                             data-tooltip-id={member.login}
                        >
                            <p>{member.displayName}</p>
                        </div>

                        <Tooltip id={member.login} className={"OrgInfoMember_Tooltip"} place={"bottom"}
                                 variant={"info"} content={member.details}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default OrgMembers;
