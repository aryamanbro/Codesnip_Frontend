import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

function SnippetModal({ show, snippet, onHide, onSave }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [linenos, setLinenos] = useState(false);

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setCode(snippet.code);
      setLanguage(snippet.language);
      setLinenos(snippet.linenos);
    } else {
      setTitle('');
      setCode('');
      setLanguage('Python');
      setLinenos(false);
    }
  }, [snippet, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...snippet, title, code, language, linenos });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onHide}
        >
          <motion.div
            className="glass-card w-full max-w-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="p-6">
              <Button
                variant="secondary"
                onClick={onHide}
                className="!p-2 absolute top-4 right-4"
              >
                <X size={20} />
              </Button>
              <h2 className="text-2xl font-bold text-white mb-6">
                {snippet ? 'Edit Snippet' : 'Create New Snippet'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Snippet Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                    <option value="Ruby">Ruby</option>
                  </Select>
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={linenos}
                      onChange={(e) => setLinenos(e.target.checked)}
                      className="w-4 h-4 rounded bg-black/30 border-white/10 text-brand-blue focus:ring-brand-blue"
                    />
                    <span>Show line numbers</span>
                  </label>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Paste your code here..."
                  className="w-full h-64 p-4 bg-black/30 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="secondary" onClick={onHide}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Snippet
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SnippetModal;