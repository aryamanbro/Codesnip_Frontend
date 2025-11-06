import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import AppNavbar from './AppNavbar';
import SnippetCard from './SnippetCard';
import SnippetModal from './SnippetModal';
import Button from '../ui/Button';
import ViewToggle from './ViewToggle';
import SnippetCarousel from './SnippetCarousel'; // Use the new 3D carousel
import { getSnippets, createSnippet, updateSnippet, deleteSnippet } from '../api';

function Dashboard({ user, onLogout }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'scroll'

  // ... (All other functions: loadSnippets, handleOpenCreate, etc. are THE SAME)
  // ... (No changes to handleSave or handleDelete either)

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

    // Render Scroll View
    if (viewMode === 'scroll') {
      // 2. USE THE NEW COMPONENT HERE
      return (
        <SnippetCarousel
          snippets={snippets}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      );
    }
  };

  return (
    <>
      <AppNavbar user={user} onLogout={onLogout} />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Your Snippets</h1>
          <div className="flex items-center gap-4">
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
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