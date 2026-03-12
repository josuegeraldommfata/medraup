import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/admin/Login';
import Dashboard from './Dashboard';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
};

export default Admin;
