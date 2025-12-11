import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// Simple user type for our mock
interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const user = api.auth.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const user = await api.auth.login(email, pass);
    setCurrentUser(user);
  };

  const logout = async () => {
    await api.auth.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-orange-600 font-oswald animate-pulse">LOADING SYSTEM...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};