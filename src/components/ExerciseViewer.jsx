import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Code2,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle2,
  Save,
  RotateCcw,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ExerciseViewer.css';

const STORAGE_PREFIX = 'exercise_code_';

function CodeEditor({ value, onChange, placeholder, spellCheck }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const val = ta.value;

      if (e.shiftKey) {
        // Dedent: remove up to 2 spaces before cursor
        const before = val.substring(0, start);
        const lineStart = before.lastIndexOf('\n') + 1;
        const lineBefore = before.substring(lineStart);
        const spacesToRemove = lineBefore.startsWith('  ') ? 2 : lineBefore.startsWith(' ') ? 1 : 0;
        if (spacesToRemove > 0) {
          const newVal = val.substring(0, lineStart) + val.substring(lineStart + spacesToRemove);
          onChange(newVal);
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = start - spacesToRemove;
          });
        }
      } else {
        // Indent: insert 2 spaces
        const newVal = val.substring(0, start) + '  ' + val.substring(end);
        onChange(newVal);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
    }
  };

  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const lines = value.split('\n');
  const lineCount = lines.length;

  return (
    <div className="ev-code-editor">
      <div className="ev-line-numbers">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i + 1}>{i + 1}</span>
        ))}
      </div>
      <div className="ev-editor-wrapper">
        <pre className="ev-editor-highlight" ref={highlightRef} aria-hidden="true">
          <SyntaxHighlighter
            language="jsx"
            style={vscDarkPlus}
            PreTag="div"
            customStyle={{ margin: 0, padding: '0.8rem', background: 'transparent', fontSize: '0.85rem', lineHeight: '1.6' }}
          >
            {value || ' '}
          </SyntaxHighlighter>
        </pre>
        <textarea
          ref={textareaRef}
          className="ev-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={spellCheck}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}

function parseExerciseMarkdown(raw) {
  const lines = raw.split('\n');
  const sections = {
    title: '',
    enunciado: [],
    requisitos: [],
    pistas: [],
    solucion: [],
    puntaje: [],
  };

  let currentSection = 'enunciado';
  let inCodeBlock = false;
  let foundSectionHeader = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (currentSection === 'solucion' || currentSection === 'pistas') {
        sections[currentSection].push(line);
      }
      continue;
    }

    if (inCodeBlock) {
      sections[currentSection].push(line);
      continue;
    }

    const titleMatch = line.match(/^##\s+(.+)/);
    if (titleMatch && !foundSectionHeader) {
      sections.title = titleMatch[1];
      foundSectionHeader = true;
      currentSection = 'enunciado';
      continue;
    }

    const sectionMarkers = {
      '**instrucciones:**': 'enunciado',
      '**enunciado:**': 'enunciado',
      '**requisitos:**': 'requisitos',
      '**pistas:**': 'pistas',
      '**pista:**': 'pistas',
      '**solución:**': 'solucion',
      '**ejemplo de solución:**': 'solucion',
      '**respuesta:**': 'solucion',
      '**puntaje:**': 'puntaje',
    };

    const lowerLine = line.trim().toLowerCase();
    for (const [marker, section] of Object.entries(sectionMarkers)) {
      if (lowerLine === marker || lowerLine.startsWith(marker + ' ')) {
        currentSection = section;
        foundSectionHeader = true;
        break;
      }
    }

    if (lowerLine === 'requisitos:' || lowerLine.startsWith('requisitos:')) {
      currentSection = 'requisitos';
      foundSectionHeader = true;
    }

    if (lowerLine.startsWith('## ')) {
      if (lowerLine.includes('pista')) currentSection = 'pistas';
      else if (lowerLine.includes('soluci')) currentSection = 'solucion';
      else if (lowerLine.includes('requisito')) currentSection = 'requisitos';
    }

    sections[currentSection].push(line);
  }

  return sections;
}

function MarkdownSection({ content }) {
  if (!content || content.length === 0) return null;
  const text = content.join('\n').trim();
  if (!text) return null;

  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            if (inline) return <code className="inline-code">{codeString}</code>;
            return (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match ? match[1] : 'javascript'}
                PreTag="div"
                className="code-block"
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            );
          },
          p({ children }) {
            const hasBlock = React.Children.toArray(children).some(
              (c) => React.isValidElement(c) && c.props?.className?.includes('code-block')
            );
            if (hasBlock) return <>{children}</>;
            return <p>{children}</p>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function ExerciseViewer({ path, fileId, isExercise = true }) {
  const [parsed, setParsed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const storageKey = `${STORAGE_PREFIX}${fileId}`;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`No se pudo cargar: ${path}`);
        const text = await res.text();
        setParsed(parseExerciseMarkdown(text));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (path) load();
  }, [path]);

  useEffect(() => {
    if (fileId) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setUserCode(saved);
          setSaved(true);
        }
      } catch { /* ignore */ }
    }
  }, [fileId, storageKey]);

  const handleSave = useCallback(() => {
    localStorage.setItem(storageKey, userCode);
    setSaved(true);
  }, [storageKey, userCode]);

  const handleReset = useCallback(() => {
    setUserCode('');
    localStorage.removeItem(storageKey);
    setSaved(false);
    setShowSolution(false);
  }, [storageKey]);

  const plainHints = parsed?.pistas?.filter((l) => {
    const t = l.trim();
    return (t.startsWith('- ') || t.startsWith('* ') || t.match(/^\d+\.\s/)) && !t.includes('```');
  }) || [];

  if (isLoading) {
    return (
      <div className="ev-loading">
        <Loader2 size={20} className="spin" />
        Cargando ejercicio...
      </div>
    );
  }

  if (error) {
    return (
      <div className="ev-error">
        <AlertCircle size={20} />
        {error}
      </div>
    );
  }

  if (!parsed) return null;

  return (
    <div className="ev-container">
      <div className="ev-enunciado">
        <MarkdownSection content={parsed.enunciado} />
        {parsed.requisitos.length > 0 && (
          <div className="ev-requisitos">
            <MarkdownSection content={parsed.requisitos} />
          </div>
        )}
      </div>

      {plainHints.length > 0 && (
        <div className="ev-hints-section">
          <button
            className="ev-hints-toggle"
            onClick={() => setHintsExpanded(!hintsExpanded)}
            aria-expanded={hintsExpanded}
          >
            <Lightbulb size={16} />
            <span>Pistas disponibles ({plainHints.length})</span>
            {hintsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {hintsExpanded && (
            <div className="ev-hints-list">
              {plainHints.map((hint, i) => (
                <div key={i} className="ev-hint-item">
                  <span className="ev-hint-num">{i + 1}</span>
                  <span>{hint.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="ev-editor-section">
        <div className="ev-editor-header">
          <div className="ev-editor-label">
            <Code2 size={16} />
            <span>{isExercise ? 'Tu código' : 'Tu respuesta'}</span>
          </div>
          <div className="ev-editor-actions">
            <button className="ev-btn ev-btn--save" onClick={handleSave} disabled={!userCode.trim()}>
              <Save size={14} />
              Guardar
            </button>
            <button className="ev-btn ev-btn--reset" onClick={handleReset} disabled={!userCode.trim()}>
              <RotateCcw size={14} />
              Limpiar
            </button>
          </div>
        </div>
        <CodeEditor
          value={userCode}
          onChange={(val) => { setUserCode(val); setSaved(false); }}
          placeholder={isExercise
            ? '// Escribe tu código aquí...'
            : '// Escribe tu respuesta aquí...'
          }
          spellCheck={false}
        />
        {saved && (
          <div className="ev-saved-indicator">
            <CheckCircle2 size={13} />
            Código guardado
          </div>
        )}
      </div>

      <div className="ev-solution-section">
        <button
          className={`ev-solution-toggle ${showSolution ? 'ev-solution-toggle--open' : ''}`}
          onClick={() => setShowSolution(!showSolution)}
          disabled={!saved}
          title={!saved ? 'Guarda tu código primero para ver la solución' : ''}
          aria-expanded={showSolution}
        >
          {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{showSolution ? 'Ocultar solución' : 'Ver solución'}</span>
        </button>
        {!saved && (
          <span className="ev-solution-hint">
            <AlertCircle size={13} />
            Guarda tu código primero para habilitar la solución
          </span>
        )}
        {showSolution && parsed.solucion.length > 0 && (
          <div className="ev-solution-content">
            <MarkdownSection content={parsed.solucion} />
          </div>
        )}
      </div>
    </div>
  );
}
