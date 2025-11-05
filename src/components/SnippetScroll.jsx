import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SnippetCard from './SnippetCard';

function SnippetScroll({ snippets, onEdit, onDelete }) {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-hidden cursor-grab"
    >
      <motion.div
        className="flex gap-6 py-4 px-2"
        drag="x"
        dragConstraints={scrollRef} // Constrains drag to the parent
        dragElastic={0.1} // Adds a "gummy" feel at the edges
      >
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onEdit={onEdit}
            onDelete={onDelete}
            viewMode="scroll" // Tell the card to use the scroll layout
          />
        ))}
      </motion.div>
    </div>
  );
}

export default SnippetScroll;