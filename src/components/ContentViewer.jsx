import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ContentViewer = ({ path }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Asumiendo que la carpeta 'docs' está accesible vía fetch (ej. en la carpeta public)
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`No se pudo cargar el archivo en: ${path}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (path) {
      fetchContent();
    }
  }, [path]);

  if (loading) return <div style={{ padding: '20px' }}>Cargando contenido...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ContentViewer;
