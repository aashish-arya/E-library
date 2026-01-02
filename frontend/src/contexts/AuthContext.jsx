import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          // Verify token is still valid by calling backend
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/me`, {
            withCredentials: true
          });
          if (response.data.success) {
            setAuthUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          } else {
            localStorage.removeItem('user');
            setAuthUser(null);
          }
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('user');
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
