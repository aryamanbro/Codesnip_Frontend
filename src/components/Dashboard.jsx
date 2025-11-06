import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Globe, LayoutGrid } from 'lucide-react'; // 1. Import Globe
import { motion } from 'framer-motion';
import AppNavbar from './AppNavbar';
import SnippetCard from './SnippetCard';
import SnippetModal from './SnippetModal';
import Button from '../ui/Button';
// 2. We don't need ViewToggle, we'll build it in here
import InfiniteMenu from './InfiniteMenu'; // 3. Import the new globe
import { getSnippets, createSnippet, updateSnippet, deleteSnippet } from '../api';

// A generic image for the globe.
// We can't screenshot our components, so we use a placeholder.
const PLACEHOLDER_IMAGE = 'https://picsum.photos/512/512?grayscale&blur=2';

function Dashboard({ user, onLogout }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'globe'

  // ... (All other functions: loadSnippets, handleOpenCreate, etc. are THE SAME)
  const loadSnippets = async () => {
    try {
      setLoading(true); setError('');
      const response = await getSnippets();
      setSnippets(response.data);
    } catch (err) {
      setError('Failed to fetch snippets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSnippets(); }, []);
  const handleOpenCreate = () => { setEditingSnippet(null); setShowModal(true); };
  const handleOpenEdit = (snippet) => { setEditingSnippet(snippet); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setEditingSnippet(null); };
  const handleSave = async (snippetData) => {
    try {
      if (snippetData.id) {
        const { id, ...dataToUpdate } = snippetData;
        await updateSnippet(id, dataToUpdate);
      } else {
        await createSnippet(snippetData);
      }
      handleCloseModal();
      loadSnippets();
    } catch (err) { setError('Failed to save snippet.'); }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSnippet(id);
        loadSnippets();
      } catch (err) { setError('Failed to delete snippet.'); }
    }
  };

  // --- 4. NEW: This function opens our modal from the globe click ---
  const handleGlobeClick = (snippet) => {
    setEditingSnippet(snippet);
    setShowModal(true);
  };

  // --- 5. NEW: This transforms our snippets into the 'items' prop ---
  const menuItems = useMemo(() => {
    return snippets.map(snippet => ({
      image: PLACEHOLDER_IMAGE, // All items get the placeholder
      title: snippet.title,
      description: snippet.language,
      originalSnippet: snippet, // <-- We attach the REAL snippet data
    }));
  }, [snippets]);


  // This function decides which layout to render
  const renderSnippets = () => {
    if (loading) {
      return <p className="text-gray-400 text-center">Loading your vault...</p>;
    }

    if (snippets.length === 0) {
      return (
        <div className="text-center text-gray-500 py-16">
          <h2 className="text-2xl font-semibold mb-2">No snippets found</h2>
          <p>Click "New Snippet" to create your first one.</p>
        </div>
      );
    }

    // Render Grid View
    if (viewMode === 'grid') {
      return (
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              viewMode="grid"
            />
          ))}
        </motion.div>
      );
    }

    // Render Globe View
    if (viewMode === 'globe') {
      return (
        <div className="w-full h-[600px]">
          <InfiniteMenu 
            items={menuItems} 
            onItemClick={handleGlobeClick} // <-- Pass our click handler
          />
        </div>
      );
    }
  };

  // --- 6. NEW: ViewToggle is now part of the Dashboard ---
  const ViewToggle = () => {
    const baseStyle = "p-2 rounded-md transition-colors";
    const activeStyle = "bg-brand-blue/30 text-brand-blue-light";
    const inactiveStyle = "text-gray-500 hover:text-gray-300 hover:bg-white/10";
    
    return (
      <div className="flex items-center gap-2 p-1 rounded-lg bg-black/30 border border-white/10">
        <button
          onClick={() => setViewMode('grid')}
          className={`${baseStyle} ${viewMode === 'grid' ? activeStyle : inactiveStyle}`}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => setViewMode('globe')}
          className={`${baseStyle} ${viewMode === 'globe' ? activeStyle : inactiveStyle}`}
        >
          <Globe size={20} />
        </button>
      </div>
    );
  };

  return (
    <>
      <AppNavbar user={user} onLogout={onLogout} />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Your Snippets</h1>
          <div className="flex items-center gap-4">
            <ViewToggle />
            <Button variant="primary" onClick={handleOpenCreate}>
              <Plus size={18} className="mr-2" />
              New Snippet
            </Button>
          </div>
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {renderSnippets()}
      </div>

      <SnippetModal
        show={showModal}
        snippet={editingSnippet}
        onHide={handleCloseModal}
        onSave={handleSave}
      />
    </>
  );
}

export default Dashboard;