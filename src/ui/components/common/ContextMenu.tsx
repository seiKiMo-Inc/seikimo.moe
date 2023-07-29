import React from "react";

import "@css/components/ContextMenu.scss";

export type ContextOption = {
    name: string;
    action: () => void;

    className?: string;
};

interface IProps {
    id: string;
    className?: string;
    options: ContextOption[];

    children?: React.ReactNode;
}

interface IState {

}

/**
 * Shows a context menu at the given coordinates.
 *
 * @param id The element ID of the context menu.
 * @param x The x coordinate to show the menu at.
 * @param y The y coordinate to show the menu at.
 */
export function showMenu(id: string, x: number, y: number): void {
    const menu = document.getElementById(id);
    if (menu) {
        menu.style.display = "flex";
        menu.style.left = x + "px";
        menu.style.top = y + "px";
    }
}

/**
 * Hides a context menu.
 *
 * @param id The element ID of the context menu.
 */
export function hideMenu(id: string): void {
    const menu = document.getElementById(id);
    if (menu) {
        menu.style.display = "none";
    }
}

class ContextMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div
                id={this.props.id}
                className={"ContextMenu" + ` ${this.props.className ?? ""}`}
            >
                {this.props.options.map((option, index) => (
                    <div key={index}
                         className={"ContextMenu_Option" + ` ${option.className ?? ""}`}
                         onClick={() => {
                             option.action(); // Invoke the action handler.
                             hideMenu(this.props.id); // Hide the menu.
                         }}
                    >
                        <p>{option.name}</p>
                    </div>
                ))}

                {this.props.children}
            </div>
        );
    }
}

export default ContextMenu;
