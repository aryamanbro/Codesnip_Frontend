import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SnippetCard from './SnippetCard';

const CARD_WIDTH = 320; 
const CARD_GAP = 24; 

function SnippetCarousel({ snippets, onEdit, onDelete }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < snippets.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative w-full h-[520px] overflow-hidden">
      {/* 3D Perspective Wrapper */}
      <div
        className="absolute inset-0"
        style={{ perspective: '1000px' }}
      >
        {/* The motion.div that moves the carousel */}
        <motion.div
          className="flex h-full w-full"
          style={{
            width: snippets.length * (CARD_WIDTH + CARD_GAP),
            left: `calc(50% - ${(CARD_WIDTH / 2)}px)`, // Center the active card
          }}
          animate={{
            x: -index * (CARD_WIDTH + CARD_GAP),
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Map each snippet to a 3D card */}
          {snippets.map((snippet, i) => (
            <motion.div
              key={snippet.id}
              className="h-full"
              style={{
                width: CARD_WIDTH,
                marginRight: CARD_GAP,
              }}
              // Apply 3D rotation based on position from the active index
              animate={{
                rotateY: i - index !== 0 ? (i < index ? 40 : -40) : 0,
                scale: i === index ? 1 : 0.85,
                opacity: i === index ? 1 : 0.6,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <SnippetCard
                snippet={snippet}
                onEdit={onEdit}
                onDelete={onDelete}
                viewMode="scroll" // Use the 'scroll' style
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={index === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-card border-none disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        disabled={index === snippets.length - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass-card border-none disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default SnippetCarousel;