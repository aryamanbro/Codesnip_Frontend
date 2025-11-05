import React from 'react';
import { LogOut, Code } from 'lucide-react';
import Button from '../ui/Button';

function AppNavbar({ user, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Code className="text-brand-blue-light" size={28} />
          <h1 className="text-xl font-bold text-white">CodeSnip</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 hidden sm:block">{user?.email}</span>
          <Button variant="secondary" onClick={onLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;