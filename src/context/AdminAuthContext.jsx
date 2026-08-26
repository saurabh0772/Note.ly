import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('notely_admin_token') || null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAdmin = async (token) => {
    try {
      const res = await fetch('/api/admin/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setAdminEmail(data.email);
        setIsAdmin(true);
      } else {
        logoutAdmin();
      }
    } catch (e) {
      logoutAdmin();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      verifyAdmin(adminToken);
    } else {
      setLoading(false);
    }
  }, [adminToken]);

  const loginAdmin = async (email, password) => {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Admin authentication failed');
    }
    localStorage.setItem('notely_admin_token', data.token);
    setAdminToken(data.token);
    setAdminEmail(data.email);
    setIsAdmin(true);
    return data;
  };

  const logoutAdmin = () => {
    localStorage.removeItem('notely_admin_token');
    setAdminToken(null);
    setAdminEmail(null);
    setIsAdmin(false);
    fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return (
    <AdminAuthContext.Provider value={{ adminEmail, adminToken, isAdmin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
