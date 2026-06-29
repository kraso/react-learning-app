import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownRenderer.css'; // We will create this next

const MarkdownRenderer = ({ content }) => {
if (!content) {
    return <div className="markdown-container">Cargando contenido...</div>;
}

return (
    <div className="markdown-container">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
    </ReactMarkdown>
    </div>
);
};

export default MarkdownRenderer;