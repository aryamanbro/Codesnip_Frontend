import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// 1. Import the new icons
import { Edit2, Trash2, Copy, Check } from 'lucide-react';
import Button from '../ui/Button';

// Accept viewMode prop
function SnippetCard({ snippet, onEdit, onDelete, viewMode = 'grid' }) {
  // 2. Add state for copy feedback
  const [isCopied, setIsCopied] = useState(false);

  // Define styles based on viewMode
  const cardClasses =
    viewMode === 'grid'
      ? 'flex-col h-full' // Grid style
      : 'flex-col w-[320px] h-[480px] flex-shrink-0'; // Scroll style

  const highlighterMaxHeight =
    viewMode === 'grid'
      ? '300px'
      : '320px'; // Taller for scroll card

  // Define motion props based on viewMode
  const motionProps =
    viewMode === 'grid'
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          whileHover: { scale: 1.02 },
        }
      : {};

  // 3. Create the copy function
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

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
          <span className="bg-brand-blue/20 text-brand-blue-light text-xs font-medium px-2.5 py-0.5 rounded-full uppercase">
            {snippet.language}
          </span>
        </div>
      </div>
      
      <div className="text-sm font-mono overflow-hidden">
        <SyntaxHighlighter
          language={snippet.language}
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

      {/* 4. Update the footer with the new button */}
      <div className="flex justify-end gap-3 p-4 mt-auto border-t border-white/10">
        <Button
          variant={isCopied ? 'primary' : 'secondary'}
          onClick={handleCopy}
          disabled={isCopied}
          className="!px-2.5" // Make button a bit wider for text
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
