import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import "./FileUpload.css";

interface FileUploadProps {
   files: File[]; // Accept multiple files via props
}

export const MAX_FILE_SIZE = 50* 1024 * 1024; // 5 MB

const FileUploadV1: React.FC<FileUploadProps> = ({ files }) => {
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (files.length === 0) return;
      const largeFile = files.some((file) => file.size > MAX_FILE_SIZE);

      if (largeFile) {
         setError("One or more files exceed the 5 MB size limit.");
      } else {
         setError(null);
      }
   }, [files]);

   const renderFilePreview = () => {
      if (!files || error) return null;

      return files.map((file, index) => {
         const fileUrl = URL.createObjectURL(file);

         return (
            <div key={index} style={{ marginBottom: "20px" }}>
               {file.type.startsWith("application/") && (
                  <DocViewer
                     documents={[{ uri: fileUrl }]}
                     pluginRenderers={DocViewerRenderers}
                     style={{ width: "100%", height: "500px" }} // Add custom styles as needed
                  />
               )}
               {file.type.startsWith("image/") && (
                  <img src={fileUrl} alt={`Uploaded file ${index}`} style={{ maxWidth: "100%" }} />
               )}
               {file.type.startsWith("video/") && (
                  <video controls style={{ width: "100%", height: "auto" }}>
                     <source src={fileUrl} />
                     Your browser does not support the video tag.
                  </video>
               )}
               {!file.type.startsWith("image/") && !file.type.startsWith("application/") && !file.type.startsWith("video/") && (
                  <p>Unsupported file type: {file.name}</p>
               )}
            </div>
         );
      });
   };

   return (
      <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
         {error && <p style={{ color: "red" }}>{error}</p>}
         <div style={{ marginTop: "20px" }}>{renderFilePreview()}</div>
      </div>
   );
};

export default FileUploadV1;