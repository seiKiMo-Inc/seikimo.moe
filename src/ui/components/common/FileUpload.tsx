import React from "react";

import { ReactComponent as CopyIcon } from "@icons/copy-icon.svg";

import "@css/FileUpload.scss";
import { newCall } from "@app/index";

interface IProps {
    id: string;
    file: File | null;
    progress: number;
    decryptKey: string;
}

class FileUpload extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    /**
     * Sets the progress of the progress bar out of 100.
     *
     * @param progress The progress to set the bar to.
     */
    private setProgress(progress: number) {
        // Get the parent elements.
        const progressElement = document.getElementById("progress");
        const linkElement = document.getElementById("link");
        if (!progressElement || !linkElement) return;

        // Check if the progress is full.
        if (progress >= 100) {
            progressElement.style.display = "none";
            linkElement.style.display = "flex";
            return;
        }

        // Set the progress.
        progressElement.style.display = "flex";
        linkElement.style.display = "none";

        const barElement = document.getElementById("bar");
        if (!barElement) return;

        barElement.style.width = `${progress}%`;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
        this.setProgress(this.props.progress);
    }

    render() {
        const { file } = this.props;
        if (!file) return undefined;

        const url = newCall(`file/${this.props.id}#${this.props.decryptKey}`);

        return (
            <div className={"FileUpload"}>
                <p
                    className={"FileUpload_Name"}
                    title={file.name}
                    onClick={() => {
                        window.open(url, "_blank");
                    }}
                >
                    {file.name.length > 30 ?
                        `${file.name.substring(0, 30)}...` : file.name
                    }
                </p>

                <div className={"FileUpload_Data"}>
                    <>
                        <div id={"progress"} className={"FileUpload_Progress"}>
                            <div className={"FileUpload_Bar"}>
                                <div id={"bar"} className={"FileUpload_Background"}>&nbsp;</div>
                            </div>
                        </div>

                        <input readOnly type={"text"} value={url}
                               id={"link"} className={"FileUpload_Link"}
                               onClick={(event) =>
                                   (event.target as HTMLInputElement).select()} />
                    </>

                    <CopyIcon
                        className={"FileUpload_Icon"}
                        onClick={() => {
                            if (this.props.id.length > 1)
                                navigator.clipboard.writeText(url)
                                    .catch(console.error);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default FileUpload;
