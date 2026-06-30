import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchMarkdownContent } from '../utils/contentLoader';
import './LegalPage.css';

export default function LegalPage({ type, onBack }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const title = type === 'terminos' ? 'Términos y Condiciones de Uso' : 'Política de Privacidad';
  const file = type === 'terminos' ? '/docs/Terminos.md' : '/docs/Privacidad.md';

  useEffect(() => {
    setLoading(true);
    fetchMarkdownContent(file).then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, [file]);

  return (
    <div className="legal-page">
      <div className="legal-nav">
        <button className="legal-back" onClick={onBack}>
          <ArrowLeft size={16} />
          Volver al Inicio
        </button>
      </div>
      <div className="legal-content">
        <h1 className="legal-title">{title}</h1>
        {loading ? (
          <div className="legal-loading">
            <Loader2 size={20} className="spin" />
            Cargando...
          </div>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
