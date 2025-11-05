import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

function ViewToggle({ viewMode, setViewMode }) {
  const baseStyle = "p-2 rounded-md transition-colors";
  const activeStyle = "bg-brand-blue/30 text-brand-blue-light";
  const inactiveStyle = "text-gray-500 hover:text-gray-300 hover:bg-white/10";

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-black/30 border border-white/10">
      <button
        onClick={() => setViewMode('grid')}
        className={`${baseStyle} ${viewMode === 'grid' ? activeStyle : inactiveStyle}`}
        aria-label="Grid View"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => setViewMode('scroll')}
        className={`${baseStyle} ${viewMode === 'scroll' ? activeStyle : inactiveStyle}`}
        aria-label="Scroll View"
      >
        <List size={20} />
      </button>
    </div>
  );
}

export default ViewToggle;