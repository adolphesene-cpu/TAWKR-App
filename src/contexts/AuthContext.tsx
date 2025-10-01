import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock users data
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 1,
    email: 'admin@tawkr.com',
    password: 'admin123',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'franchise.bordeaux@tawkr.com',
    password: 'franchise123',
    role: 'franchise',
    franchise_id: 1,
    franchise_name: 'Franchise Bordeaux',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    email: 'franchise.toulouse@tawkr.com',
    password: 'franchise123',
    role: 'franchise',
    franchise_id: 2,
    franchise_name: 'Franchise Toulouse',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}