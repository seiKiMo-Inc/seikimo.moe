import React from "react";

import { expectedOrigin, router } from "@app/index";
import { isOnMobile } from "@utils/general";

import "@css/landing/Navigation.scss"

/**
 * Redirects the user to the URI.
 *
 * @param uri The URI to redirect the user to.
 */
function launch(uri: string): void {
    if (uri.includes("://")) {
        window.location.replace(uri);
    } else {
        window.location.replace(`${expectedOrigin()}/${uri}`);
    }
}

interface IState {
    menuOpen: boolean;
    isOpaque: boolean;
}

class Navigation extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            menuOpen: false,
            isOpaque: false
        };
    }

    /**
     * Handles the scroll event.
     */
    private handleScroll(): void {
        const { isOpaque } = this.state;
        const navBar = document.getElementById("navBar") as HTMLElement;

        if (window.scrollY > 15 && !isOpaque) {
            this.setState({ isOpaque: true });
            navBar.style.background = "#1c1c1e";
        } else if (window.scrollY <= 15 && isOpaque) {
            this.setState({ isOpaque: false });
            navBar.style.background = "linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.7))";
        }
    }

    componentDidMount() {
        if ((window as any).navigation) {
            return;
        }

        (window as any).navigation = this;
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        if (!(window as any).navigation) {
            return;
        }

        (window as any).navigation = undefined;
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    render() {
        return (
            <>
                <div id={"navBar"} className={"NavigationBar"}>
                    {!isOnMobile() ? (
                        <div className={"NavigationBar_Container"}>
                            <div className={"NavigationBar_Page"}
                                 onClick={() => router.navigate("/")}
                            >
                                <p>Home</p>
                            </div>

                            <div className={"NavigationBar_Page"}
                                 onClick={() => launch("https://laudiolin.seikimo.moe")}
                            >
                                <p>Laudiolin</p>
                            </div>

                            <div className={"NavigationBar_Page"}
                                 onClick={() => launch("chat")}
                            >
                                <p>Chat</p>
                            </div>

                            <div className={"NavigationBar_Page"}
                                 onClick={() => launch("upload")}
                            >
                                <p>Upload</p>
                            </div>

                            <div className={"NavigationBar_Page"}
                                 onClick={() => launch("paste")}
                            >
                                <p>Paste</p>
                            </div>

                            {
                                (window as any)["account"] != null && (
                                    <div className={"NavigationBar_Page"}
                                         onClick={() => launch("account")}
                                    >
                                        <p>Account</p>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </>
        );
    }
}

export default Navigation;
