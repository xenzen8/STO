import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Lock, AlertCircle, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Failed to login. Check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
      <div className="bg-neutral-900 border border-gray-800 p-8 rounded-sm shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-white font-oswald tracking-wide">ADMIN ACCESS</h1>
          <p className="text-gray-400 text-sm mt-2">Enter email and password to access dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Email</label>
            <div className="relative">
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-800 p-3 pl-10 text-white focus:outline-none focus:border-orange-600 transition-colors"
                placeholder="admin@stotargets.com"
                required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider">Password</label>
            <div className="relative">
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-800 p-3 pl-10 text-white focus:outline-none focus:border-orange-600 transition-colors tracking-widest"
                placeholder="••••••••"
                required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm justify-center bg-red-500/10 p-2 border border-red-500/20 rounded">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
};