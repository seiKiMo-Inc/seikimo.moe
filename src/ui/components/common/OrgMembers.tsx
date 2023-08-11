import React from "react";

import { Tooltip } from "react-tooltip";

import { getAllMembers } from "@backend/user";
import { Member, Owners } from "@backend/types";

import "@css/OrgInfo.css";

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
            <div id={"membersList"} className={"OrgInfoMembersList"}>
                {this.state.members.map((member, index) => (
                    <div className={"OrgInfoMember"} key={member.id} style={{ transitionDelay: `${index * 100}ms` }}>
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

                            <svg viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" onClick={() => this.openMemberGithub(member)}>
                                <path d="M84.1 15.9c-8-7.9-20.9-7.9-28.8 0L41.7 29.6c-1.5 1.5-2.6 3.1-3.6 4.8.9-.2 1.9-.4 2.8-.6 1.9-.2 3.7-.3 5.6-.1l13.3-13.3c5.4-5.4 14.3-5.4 19.7 0 5.4 5.4 5.4 14.3 0 19.7L66.2 53.4l-.3.3c-.5.5-1.1 1-1.7 1.4-.7.5-1.4.9-2.1 1.3-1.4.7-2.9 1.1-4.4 1.3-.7.1-1.4.1-2.2.1-.7 0-1.4-.1-2.1-.2-2.6-.5-5.2-1.8-7.2-3.8s-3.3-4.6-3.8-7.2c-.1-.7-.2-1.4-.2-2.1-1.5.2-2.9.7-4.2 1.5-.7.4-1.3.9-2 1.4.1.8.3 1.6.6 2.4.9 3.1 2.6 6.1 5.1 8.5s5.4 4.2 8.5 5.1l2.4.6c.8.1 1.7.2 2.5.3 1.7.1 3.5-.1 5.2-.4.9-.2 1.8-.5 2.6-.8.9-.3 1.8-.7 2.6-1.1 1.7-.9 3.4-2.1 4.8-3.6l13.6-13.6c8.1-8 8.1-20.9.2-28.9z" />
                                <path d="M61.9 65.6c-.9.2-1.9.4-2.8.6-1.9.2-3.7.3-5.6.1L40.2 79.5c-5.4 5.4-14.3 5.4-19.7 0-5.4-5.4-5.4-14.3 0-19.7l13.3-13.3.3-.3c.5-.5 1.1-1 1.7-1.4.7-.5 1.4-.9 2.1-1.3 1.4-.7 2.9-1.1 4.4-1.3.7-.1 1.4-.1 2.2-.1.7 0 1.4.1 2.1.2 2.6.5 5.2 1.8 7.2 3.8s3.3 4.6 3.8 7.2c.1.7.2 1.4.2 2.1 1.5-.2 2.9-.7 4.2-1.5.7-.4 1.3-.9 2-1.4-.1-.8-.3-1.6-.6-2.4-.9-3.1-2.6-6.1-5.1-8.5s-5.4-4.2-8.5-5.1l-2.4-.6c-.8-.1-1.7-.2-2.5-.3-1.7-.1-3.5.1-5.2.4-.9.2-1.8.5-2.6.8-.9.3-1.8.7-2.6 1.1-1.7.9-3.4 2.1-4.8 3.6L15.9 55.3C8 63.2 8 76.1 15.9 84.1s20.8 7.9 28.8 0l13.6-13.6c1.5-1.5 2.7-3.1 3.6-4.9z" />
                            </svg>
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
