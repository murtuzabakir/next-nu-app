import React, { useState, useRef, useCallback } from "react";
import "./UploadModal.scss";
import { Button } from "../Button/Button";

interface UploadModalProps {
   isOpen: boolean;
   onClose: () => void;
   onUpload: (files: File[]) => void; // Pass selected files to parent for further processing
   maxFiles?: number;
   acceptedFileTypes?: string;
   modalTitle?: string;
   uploadButtonText?: string;
   cancelButtonText?: string;
   supportedFormatsText?: string;
}

const ACCEPTED_FILES_TYPES = ".jpg,.jpeg,.png,.pptx,.docx,.xlsx,.mp4,.mkv"

const UploadModal: React.FC<UploadModalProps> = ({
   isOpen,
   onClose,
   onUpload,
   maxFiles = 1,
   acceptedFileTypes = ACCEPTED_FILES_TYPES,
   modalTitle = "Media Upload",
   uploadButtonText = "Next",
   cancelButtonText = "Cancel",
   supportedFormatsText = `Supports ${ACCEPTED_FILES_TYPES} files`,
}) => {
   const [files, setFiles] = useState<File[]>([]);
   const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

   const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         setFiles(Array.from(event.target.files).slice(0, maxFiles));
      }
   };

   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const droppedFiles = Array.from(event.dataTransfer.files).slice(0, maxFiles - files.length);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
   };

   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
   };

   const handleNext = useCallback(() => {
      if (files.length > 0) {
         onUpload(files);
         setFiles([]); // Clear files after upload
         onClose();
      }
   }, [files, onUpload, onClose]);

   const handleBrowseClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click(); // Trigger click on the hidden file input
      }
   };

   return (
      <>
         {isOpen && (
            <div className="modal-overlay">
               <div className="modal">
                  <button className="modal-close" onClick={onClose}>
                     &times;
                  </button>
                  <h2 className="modal-title">{modalTitle}</h2>
                  <p className="modal-description">
                     Add your documents here, and you can upload up to {maxFiles} files max
                  </p>

                  <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
                     <div className="upload-area">
                        <img src="/images/upload_file.svg" alt="Upload Icon" className="upload-icon" />
                        <p className="drag-file-text">Drag your file(s) to start uploading</p>

                        <div className="OR_division">
                           <div className="line"></div>
                           <p>OR</p>
                           <div className="line"></div>
                        </div>

                        {/* Button to trigger the file input */}
                        <Button label="Browse files" variant="text" onClick={handleBrowseClick} />
                        <input
                           type="file"
                           ref={fileInputRef} // Connect ref to the input
                           onChange={handleFilesChange}
                           style={{ display: "none" }}
                           accept={acceptedFileTypes}
                           multiple={false} // Allow multiple file selection if more than 1 file is allowed
                        />
                     </div>
                  </div>

                  <p className="supported-formats">{supportedFormatsText}</p>

                  <div className="modal-footer">
                     <Button label={cancelButtonText} onClick={onClose} />
                     <Button variant="text" label={uploadButtonText} onClick={handleNext} />
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default UploadModal;
