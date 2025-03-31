
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from '@/services/AuthService';
import { toast } from 'sonner';

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await signIn(email, password);
      
      if (user) {
        setUser(user);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const success = await signOut();
      
      if (success) {
        setUser(null);
        toast.success('Logged out successfully');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await signUp(email, password);
      if (user) {
        toast.success('Registration successful! Please check your email for verification.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
