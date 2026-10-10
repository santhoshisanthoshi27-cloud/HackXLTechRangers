import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, PromotionPlatform } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  selectedProfession: UserRole | null;
  setSelectedProfession: (role: UserRole) => void;
  login: (email: string, password?: string, role?: UserRole) => Promise<any>;
  register: (profileData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    password?: string;
  }) => Promise<void>;
  logout: () => void;
  updateUserPlatforms: (platforms: PromotionPlatform[]) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  switchRoleDemo: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProfession, setSelectedProfessionState] = useState<UserRole | null>(() => {
    try {
      const saved = localStorage.getItem('necto_selected_role');
      return (saved as UserRole) || 'business';
    } catch {
      return 'business';
    }
  });

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('necto_access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      if (response.data.role) {
        setSelectedProfessionState(response.data.role as UserRole);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('necto_access_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const setSelectedProfession = (role: UserRole) => {
    setSelectedProfessionState(role);
    localStorage.setItem('necto_selected_role', role);
  };

  const login = async (email: string, password?: string, preferredRole?: UserRole) => {
    try {
      setIsLoading(true);
      // For demo fallback if no password is provided
      const loginPassword = password || "password123"; 
      
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', loginPassword);

      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = response.data;
      localStorage.setItem('necto_access_token', access_token);
      
      const meResponse = await api.get('/auth/me');
      setUser(meResponse.data);
      if (meResponse.data.role) {
        setSelectedProfessionState(meResponse.data.role as UserRole);
      }
      return meResponse.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (profileData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    password?: string;
  }) => {
    try {
      setIsLoading(true);
      const registerData = {
        email: profileData.email,
        full_name: profileData.fullName,
        role: profileData.role,
        password: profileData.password || "password123"
      };

      await api.post('/auth/register', registerData);
      
      // Auto login after register
      await login(profileData.email, registerData.password);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('necto_access_token');
    localStorage.removeItem('necto_demo_user'); // cleanup old demo
  };

  const updateUserPlatforms = async (platforms: PromotionPlatform[]) => {
    if (user) {
      try {
        const response = await api.put('/users/me', { platforms });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to update platforms', error);
      }
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      try {
        const response = await api.put('/users/me', updates);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to update profile', error);
      }
    }
  };

  // Deprecated demo switch, kept for backwards compatibility if needed
  const switchRoleDemo = (role: UserRole) => {
    setSelectedProfession(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedProfession,
        setSelectedProfession,
        login,
        register,
        logout,
        updateUserPlatforms,
        updateUserProfile,
        switchRoleDemo,
        isLoading
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
