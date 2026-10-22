import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, getDefaultRouteForRole } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '16px',
        backgroundColor: 'var(--color-bg-body)'
      }}>
        <div className="spinner" style={{ width: '36px', height: '36px' }}></div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Chargement de votre session CoVaDeS...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || '').toLowerCase();
    const hasRole = allowedRoles.some((r) => r.toLowerCase() === userRole);

    if (!hasRole) {
      // Redirection vers l'espace autorisé de l'utilisateur
      const destination = getDefaultRouteForRole(userRole);
      return <Navigate to={destination} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
