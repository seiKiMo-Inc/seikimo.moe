import React, { useState } from "react";
import Turnstile from "react-turnstile";

interface IProps {
    setToken: (token: string) => void;
}

function TurnstileWidget(props: IProps) {
    const [show, setShow] = useState(false);

    return (
        <Turnstile
            style={{ display: show ? "block" : "none" }}

            theme={"dark"}
            sitekey={import.meta.env.VITE_TURNSTILE_KEY}

            onVerify={(token) => {
                props.setToken(token);
                setShow(false);
            }}
            onLoad={() => setShow(true)}
            onUnsupported={() => setShow(true)}
            onAfterInteractive={() => setShow(true)}
        />
    );
}

export default TurnstileWidget;
