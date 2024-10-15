// components/TextEditor.tsx
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Delta } from "quill";
import "./QuillText.scss";

interface TextEditorProps {
    onContentChange: (content: string) => void;
    initialContent?: string;
}

const QuillText: React.FC<TextEditorProps> = ({ onContentChange, initialContent = "" }) => {
    const [editorContent, setEditorContent] = useState<string>(initialContent);

    const handleEditorChange = (content: string, delta: Delta, source: string, editor: any) => {
        setEditorContent(content);
        onContentChange(content);
    };

    return (
        <ReactQuill
            value={editorContent}
            onChange={handleEditorChange}
            theme="snow" // Default theme
            modules={modules}
            formats={formats}
            placeholder="Write something amazing..."
        />
    );
};

// Quill modules (optional customization)
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "code-block"],
        ["clean"],
    ],
};

// Quill formats (optional customization)
const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "align", "color", "background", "link", "image", "code-block"];

export default QuillText;
