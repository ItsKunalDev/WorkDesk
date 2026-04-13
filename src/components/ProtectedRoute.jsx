import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useAppContext();

  // While Firebase is resolving auth state, show nothing (prevents flash)
  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
        <div style={{ color: 'var(--accent)', fontSize: '1rem' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
