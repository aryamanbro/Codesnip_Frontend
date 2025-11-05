import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { login, register } from '../api';
import Button from '../ui/Button';
import Input from '../ui/Input';

function LoginPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const response = await login(email, password);
        onLoginSuccess(response.data.access_token);
      } else {
        await register(email, password);
        const response = await login(email, password);
        onLoginSuccess(response.data.access_token);
      }
    } catch (err) {
      setError(isLogin ? 'Login failed.' : 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <motion.div
        className="glass-card w-full max-w-md p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          CodeSnip
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Your Futuristic Snippet Vault
        </p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-brand-blue-light hover:underline ml-2"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;