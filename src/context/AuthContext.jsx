import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const getDefaultRouteForRole = (role) => {
  if (!role) return '/';
  const r = role.toLowerCase();
  if (r === 'pme') return '/pme';
  if (r === 'factory' || r === 'usine') return '/usine';
  if (r === 'mairie') return '/mairie';
  if (r === 'ztt') return '/ztt';
  if (r === 'admin') return '/admin';
  return '/'; // Citoyen ou public
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('covades_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('covades_token') || null);
  const [loading, setLoading] = useState(true);

  // Synchronisation du profil à l'initialisation
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('covades_token');
      if (savedToken) {
        try {
          const res = await authApi.getMe();
          if (res.data?.success && res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem('covades_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session expirée ou invalide, déconnexion...', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (identifier, password) => {
    // Le backend supporte soit phone, soit email
    const isEmail = identifier.includes('@');
    const payload = isEmail
      ? { email: identifier.trim().toLowerCase(), password }
      : { phone: identifier.trim(), password };

    const res = await authApi.login(payload);
    if (res.data?.success && res.data?.data) {
      const { token: receivedToken, user: receivedUser } = res.data.data;
      
      localStorage.setItem('covades_token', receivedToken);
      setToken(receivedToken);

      // Récupérer le profil complet
      try {
        const meRes = await authApi.getMe();
        const fullUser = meRes.data?.data || receivedUser;
        setUser(fullUser);
        localStorage.setItem('covades_user', JSON.stringify(fullUser));
        return fullUser;
      } catch {
        setUser(receivedUser);
        localStorage.setItem('covades_user', JSON.stringify(receivedUser));
        return receivedUser;
      }
    } else {
      throw new Error(res.data?.message || 'Identifiants invalides');
    }
  };

  const logout = () => {
    localStorage.removeItem('covades_token');
    localStorage.removeItem('covades_user');
    setUser(null);
    setToken(null);
  };

  const updateUserProfile = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('covades_user', JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        updateUserProfile,
        getDefaultRouteForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
