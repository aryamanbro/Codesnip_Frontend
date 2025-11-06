import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Edit2, Trash2, Copy, Check } from 'lucide-react';
import Button from '../ui/Button';
import { languageColors } from '../utils/ImageGenerator'; // <-- 1. IMPORT COLORS

function SnippetCard({ snippet, onEdit, onDelete, viewMode = 'grid' }) {
  const [isCopied, setIsCopied] = useState(false);

  const cardClasses =
    viewMode === 'grid'
      ? 'flex-col h-full'
      : 'flex-col w-[320px] h-[480px] flex-shrink-0';

  const highlighterMaxHeight =
    viewMode === 'grid'
      ? '300px'
      : '320px';

  const motionProps =
    viewMode === 'grid'
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          whileHover: { scale: 1.02 },
        }
      : {};

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // --- 2. GET THE COLOR FOR THIS SNIPPET ---
  const langColor =
    languageColors[snippet.language.toLowerCase()] || languageColors.default;

  return (
    <motion.div
      className={`glass-card flex overflow-hidden ${cardClasses}`}
      {...motionProps}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white truncate">
            {snippet.title}
          </h3>
          
          {/* --- 3. APPLY THE DYNAMIC COLOR --- */}
          <span 
            className="text-xs font-medium px-2.5 py-0.5 rounded-full uppercase"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // A dark, glassy background
              color: langColor,                     // The bright language color
              border: `1px solid ${langColor}90`     // A solid border of that color
            }}
          >
            {snippet.language}
          </span>
        </div>
      </div>
      
      <div className="text-sm font-mono overflow-hidden">
        <SyntaxHighlighter
          language={snippet.language.toLowerCase()}
          style={atomOneDark}
          customStyle={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            maxHeight: highlighterMaxHeight,
            overflow: 'auto',
            margin: 0,
            padding: '1.5rem',
            paddingLeft: snippet.linenos ? '1rem' : '1.5rem',
          }}
          showLineNumbers={snippet.linenos}
          lineNumberStyle={{ color: '#5a5a6e', paddingRight: '1rem' }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="flex justify-end gap-3 p-4 mt-auto border-t border-white/10">
        <Button
          variant={isCopied ? 'primary' : 'secondary'}
          onClick={handleCopy}
          disabled={isCopied}
          className="!px-2.5"
        >
          {isCopied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
        </Button>
        <Button variant="secondary" onClick={() => onEdit(snippet)}>
          <Edit2 size={16} />
        </Button>
        <Button variant="danger" onClick={() => onDelete(snippet.id)}>
          <Trash2 size={16} />
        </Button>
      </div>
    </motion.div>
  );
}

export default SnippetCard;