import React from 'react';
import { motion } from 'framer-motion';
import SnippetCard from './SnippetCard';

// Define animation variants for the seamless loop
const scrollVariants = {
  animate: {
    x: ['-100%', '0%'], // Move from the "cloned" list back to the start
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40, // Adjust this duration to change the speed
        ease: 'linear',
      },
    },
  },
};

function InfiniteSnippetScroll({ snippets, onEdit, onDelete }) {
  // We need to duplicate the list of snippets to create the seamless loop
  const duplicatedSnippets = [...snippets, ...snippets];

  return (
    <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex gap-6 py-4"
        variants={scrollVariants}
        animate="animate"
      >
        {duplicatedSnippets.map((snippet, index) => (
          <SnippetCard
            key={`${snippet.id}-${index}`} // Create a unique key for the duplicated items
            snippet={snippet}
            onEdit={onEdit}
            onDelete={onDelete}
            viewMode="scroll" // Use the "scroll" style for the card
          />
        ))}
      </motion.div>
    </div>
  );
}

export default InfiniteSnippetScroll;
