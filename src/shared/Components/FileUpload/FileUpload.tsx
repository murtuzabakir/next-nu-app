// src/components/FileUpload.tsx
import React, { useState } from "react";
// import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from '../constants/fileTypes';
import './FileUpload.css'
// src/constants/fileTypes.js
export const SUPPORTED_FILE_TYPES = {
    IMAGE: ["image/jpeg", "image/png", "image/gif"],
    PDF: ["application/pdf"],
    DOCUMENT: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    PPT: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                setError("File size exceeds 5 MB.");
                setFile(null);
                return;
            }

            if (!isSupportedFileType(selectedFile.type)) {
                setError("Unsupported file type.");
                setFile(null);
                return;
            }

            setFile(selectedFile);
            setError(null);
        }
    };

    const isSupportedFileType = (type: string) => {
        return Object.values(SUPPORTED_FILE_TYPES).some((types) => types.includes(type));
    };

    const renderFilePreview = () => {
        if (!file) return null;

        const fileUrl = URL.createObjectURL(file);
        const fileType = file.type.split("/")[0];

        switch (fileType) {
            case "image":
                return <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: "100%" }} />;
            case "application":
                if (file.type.includes("pdf")) {
                    return <iframe src={fileUrl} style={{ width: "100%", height: "500px" }} title="PDF Preview" />;
                } else if (file.type.includes("vnd.openxmlformats-officedocument")) {
                    return <iframe src={fileUrl} style={{ width: "100%", height: "500px" }} title="Document Preview" />;
                } else if (file.type.includes("presentation")) {
                    return <iframe src={fileUrl} style={{ width: "100%", height: "500px" }} title="PPT Preview" />;
                }
                break;
            default:
                return null;
        }
    };

    return (
        <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
            <input type="file" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginTop: "20px" }}>{renderFilePreview()}</div>
        </div>
    );
};

export default FileUpload;
