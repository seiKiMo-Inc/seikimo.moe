import React from "react";

import "@css/components/Alert.scss";

/**
 * Shows the alert with the specified ID.
 *
 * @param id The ID of the alert to show.
 */
export function show(id: string): void {
    const alert = document.getElementById(id) as HTMLDivElement;
    alert.style.display = "flex";
}

/**
 * Hides the alert with the specified ID.
 *
 * @param id The ID of the alert to hide.
 */
export function hide(id: string): void {
    const alert = document.getElementById(id) as HTMLDivElement;
    alert.style.display = "none";
}

interface IProps {
    icon?: React.ReactNode;
    content: string;

    id?: string;
}

class Alert extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div className={"Alert"}
                 id={this.props.id ?? ""}
            >
                {this.props.icon}
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default Alert;
