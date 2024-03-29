import React from "react";

import FileUpload from "@components/common/FileUpload";

import axios from "axios";
import { newCall } from "@app/index";

import * as crypto from "@backend/crypto";

import "@css/pages/UploadPage.scss";

type UploadInfo = {
    id: string;
    file: File;
    key: string;
    progress: number;
};

interface IProps {

}

interface IState {
    uploads: UploadInfo[];
    lastClipboard: number;
}

class UploadPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            uploads: [],
            lastClipboard: Date.now()
        };
    }

    /**
     * Enables or disables the mosaics on the page.
     */
    private updateMosaic() {
        const mosaics = document.getElementsByClassName("UploadPage_Mosaic");
        for (const mosaic of mosaics) {
            (mosaic as HTMLElement).style.display =
                localStorage.getItem("showMosaic") == "true" ? "flex" : "none";
        }
    }

    /**
     * Invoked when the user selects a file to upload.
     *
     * @param event The event that triggered this function.
     */
    private async onSetFile(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        const targetFile = files?.item(0);
        targetFile && await this.uploadFile(targetFile);
    }

    /**
     * Invoked when the user drops items onto the page.
     *
     * @param event The event that triggered this function.
     */
    private async onDropItems(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();

        const dataTransfer = event.dataTransfer;
        if (!dataTransfer) return;

        await this.uploadItems(dataTransfer.files, dataTransfer.items);
    }

    /**
     * Invoked when the user pastes something onto the page.
     *
     * @param event The event that triggered this function.
     */
    private async onPaste(event: ClipboardEvent) {
        if (this.state.lastClipboard + 100 > Date.now()) return;
        this.setState({ lastClipboard: Date.now() });

        const clipboard = event.clipboardData;
        if (!clipboard) return;

        await this.uploadItems(clipboard.files, clipboard.items);
    }

    /**
     * Invoked when the user clicks the select file button.
     *
     * @param files The files to upload.
     * @param items The items to upload.
     */
    private async uploadItems(files: FileList | undefined, items: DataTransferItemList | undefined) {
        const uploadedFiles: File[] = [];

        if (files) {
            const targetFile = files.item(0);
            if (targetFile && !uploadedFiles.includes(targetFile)) {
                uploadedFiles.push(targetFile);
                await this.uploadFile(targetFile);
            }
        }

        if (items) {
            for (const item of items) {
                if (item.kind == "file") {
                    const file = item.getAsFile();
                    if (!file) continue;

                    // Check if the file has already been uploaded.
                    if (uploadedFiles.includes(file)) continue;
                    uploadedFiles.push(file);

                    await this.uploadFile(file);
                }
            }
        }
    }

    /**
     * Invoked when the user clicks the select file button.
     * This function will open the file selection dialogue.
     */
    private onSelectFile() {
        const upload = document.getElementById("upload");
        upload && upload.click();
    }

    /**
     * Sets the upload info for the given index.
     *
     * @param index The index to set the info for.
     * @param info The info to set.
     */
    private setInfoFor(index: number, info: UploadInfo | null) {
        const { uploads } = this.state;

        // Check if the info is null.
        if (info == null) {
            // Remove the info from the pending list.
            uploads.splice(index, 1);
        } else uploads[index] = info;

        this.setState({ uploads: uploads });
    }

    /**
     * Invoked when the user clicks the upload button.
     *
     * @param file The file to upload.
     */
    private async uploadFile(file: File) {
        // Generate a new encryption key.
        const key = await crypto.generateKey();
        const keyStr = await crypto.exportKey(key);

        // Create a new file reader.
        const reader = new FileReader();
        await new Promise<void>((resolve, reject) => {
            reader.onload = async (event) => {
                const data = event.target?.result;
                if (data) {
                    // Encrypt the file.
                    const encrypted = await crypto.encrypt(
                        data as ArrayBuffer, key);

                    // Create a new file.
                    file = new File([encrypted], file.name, {
                        type: file.type
                    });

                    resolve();
                } else {
                    reject();
                }
            };
            reader.readAsArrayBuffer(file);
        });

        let index = -1; try {
            // Perform a preflight to check if the user can upload.
            const preflight = await axios.request({
                method: "GET", url: newCall("upload/check"),
                headers: {
                    "Content-Size": file.size
                }
            });

            // Validate the response status.
            if (preflight.status != 200) {
                alert("Unable to upload file.");
                return;
            }

            // Create a new upload info object.
            const uploadInfo: UploadInfo = {
                id: "",
                file,
                key: keyStr,
                progress: 0
            };

            // Get a random index for the upload.
            index = Math.floor(Math.random() * 1000);
            this.setInfoFor(index, uploadInfo);

            // Add the file to a FormData object.
            const formData = new FormData();
            formData.append("file", file);

            // Use axios to upload the file.
            const response = await axios.request({
                method: "POST",
                url: newCall("upload"),
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progress) => {
                    const { loaded, total } = progress;
                    uploadInfo.progress = Math.min(99,
                        Math.floor((loaded / (total ?? 100)) * 100));
                    this.setInfoFor(index, uploadInfo);
                }
            });

            // Validate the response status.
            if (response.status != 200) {
                this.setInfoFor(index, null);
            }

            // Set the upload info's id.
            uploadInfo.id = response.data.id;
            uploadInfo.progress = 100;
            this.setInfoFor(index, uploadInfo);
        } catch (exception) {
            index != -1 && this.setInfoFor(index, null);
        }
    }

    componentDidMount() {
        this.updateMosaic();

        document.addEventListener("paste", this.onPaste.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("paste", this.onPaste.bind(this));
    }

    render() {
        const { uploads } = this.state;

        return (
            <div className={"UploadPage"}>
                <div className={"UploadPage_Mosaic"}>

                </div>

                <div className={"UploadPage_Content"}>
                    <div className={"UploadPage_Header"}>
                        <p className={"text-3xl"}>seiKiMo Files</p>
                        <p className={"text-lg"}>Temporary & Secure file hosting</p>
                    </div>

                    <div
                        className={"UploadPage_Dialogue"}
                        onDrop={this.onDropItems.bind(this)}
                        onClick={this.onSelectFile.bind(this)}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        <div className={"select-none text-center text-black"}>
                            <p className={"text-4xl"}>Drag a File Here</p>
                            <p className={"text-xl"}>Alternatively, paste from your clipboard</p>
                        </div>

                        <button className={"UploadPage_Select"}>Select File</button>

                        <input id={"upload"} type={"file"}
                               onChange={this.onSetFile.bind(this)}
                        />
                    </div>

                    <div className={"UploadPage_Uploads"}>
                        {uploads.length > 0 && (
                            <p className={"text-2xl text-center"}>Uploads</p>
                        )}

                        {
                            uploads.map((upload, index) =>
                                <FileUpload key={index} id={upload.id} decryptKey={upload.key}
                                            file={upload.file} progress={upload.progress} />
                            )
                        }
                    </div>
                </div>

                <div className={"UploadPage_Mosaic"}>

                </div>
            </div>
        );
    }
}

export default UploadPage;
