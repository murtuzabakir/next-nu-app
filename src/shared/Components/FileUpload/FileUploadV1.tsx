// src/components/FileUpload.tsx
'use client'
import React, { useState } from "react";
import "@cyntler/react-doc-viewer/dist/index.css"; // Importing CSS for styling
import './FileUpload.css';
import dynamic from "next/dynamic";
import { DocViewerRenderers } from "react-doc-viewer";

export const SUPPORTED_FILE_TYPES = {
   IMAGE: ["image/jpeg", "image/png", "image/gif"],
   PDF: ["application/pdf"],
   DOCUMENT: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
   PPT: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
   OTHER: ["text/html", "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
};

const DocViewer = dynamic(() => import('@cyntler/react-doc-viewer'), { ssr: false });

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
      const documents = [{ uri: fileUrl }];

      return (
         <DocViewer
            documents={documents}
            pluginRenderers={DocViewerRenderers}
            style={{ width: '100%', height: '500px' }}
         />
      );
   };

   return (
      <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
         <input type="file" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.html,.txt,.xls,.xlsx" onChange={handleFileChange} />
         {error && <p style={{ color: "red" }}>{error}</p>}
         <div style={{ marginTop: "20px" }}>{renderFilePreview()}</div>
      </div>
   );
};

export default FileUpload;