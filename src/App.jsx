import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages publiques
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Espaces professionnels
import PmeDashboardPage from './pages/pme/PmeDashboardPage';
import UsineDashboardPage from './pages/usine/UsineDashboardPage';
import MairieDashboardPage from './pages/mairie/MairieDashboardPage';
import ZttDashboardPage from './pages/ztt/ZttDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Espace PME de Collecte */}
          <Route 
            path="/pme/*" 
            element={
              <ProtectedRoute allowedRoles={['pme', 'admin']}>
                <PmeDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Espace Usine de Recyclage & Transformation */}
          <Route 
            path="/usine/*" 
            element={
              <ProtectedRoute allowedRoles={['factory', 'usine', 'admin']}>
                <UsineDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Espace Mairie & Collectivités Locales */}
          <Route 
            path="/mairie/*" 
            element={
              <ProtectedRoute allowedRoles={['mairie', 'admin']}>
                <MairieDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Espace ZTT (Centre de Tri et Transit) */}
          <Route 
            path="/ztt/*" 
            element={
              <ProtectedRoute allowedRoles={['ztt', 'admin']}>
                <ZttDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Espace Administration CoVaDeS */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Route par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
