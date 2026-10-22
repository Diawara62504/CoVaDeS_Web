import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Trash2, 
  Users, 
  MapPin, 
  Building2, 
  Factory, 
  Layers, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  ExternalLink,
  Bell,
  RefreshCw,
  FolderKanban
} from 'lucide-react';

const DashboardLayout = ({ title, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter de votre espace CoVaDeS ?')) {
      logout();
      navigate('/login');
    }
  };

  const role = (user?.role || '').toLowerCase();

  // Configuration des menus selon le rôle
  const getNavItems = () => {
    switch (role) {
      case 'pme':
        return [
          { label: 'Vue d\'ensemble', path: '/pme', icon: <LayoutDashboard size={20} /> },
          { label: 'Signalements & Collectes', path: '/pme/signalements', icon: <Trash2 size={20} /> },
          { label: 'Ménages & Abonnés', path: '/pme/clients', icon: <Users size={20} /> },
          { label: 'Équipe de Collecteurs', path: '/pme/collecteurs', icon: <FolderKanban size={20} /> },
        ];
      case 'factory':
      case 'usine':
        return [
          { label: 'Tableau de bord Usine', path: '/usine', icon: <LayoutDashboard size={20} /> },
          { label: 'Matières en Stock ZTT', path: '/usine/matieres', icon: <Layers size={20} /> },
          { label: 'Produits Recyclés', path: '/usine/produits', icon: <Package size={20} /> },
        ];
      case 'mairie':
        return [
          { label: 'Indicateurs Territoire', path: '/mairie', icon: <LayoutDashboard size={20} /> },
          { label: 'Carte des Déchets & SIG', path: '/mairie/carte', icon: <MapPin size={20} /> },
          { label: 'Agrément des PME', path: '/mairie/pmes', icon: <Building2 size={20} /> },
          { label: 'Centres de Tri (ZTT)', path: '/mairie/ztts', icon: <Factory size={20} /> },
        ];
      case 'ztt':
        return [
          { label: 'Tableau de bord ZTT', path: '/ztt', icon: <LayoutDashboard size={20} /> },
          { label: 'Arrivages Déchets (PME)', path: '/ztt/arrivages', icon: <Trash2 size={20} /> },
          { label: 'Saisie du Tri Matière', path: '/ztt/tri', icon: <Layers size={20} /> },
          { label: 'Stocks Matières Usines', path: '/ztt/stocks', icon: <Package size={20} /> },
        ];
      case 'admin':
        return [
          { label: 'Supervision Globale', path: '/admin', icon: <LayoutDashboard size={20} /> },
          { label: 'Gestion des Utilisateurs', path: '/admin/utilisateurs', icon: <Users size={20} /> },
          { label: 'Zones Territoriales', path: '/admin/zones', icon: <MapPin size={20} /> },
          { label: 'Catégories de Déchets', path: '/admin/categories', icon: <Trash2 size={20} /> },
        ];
      default:
        return [
          { label: 'Accueil', path: '/', icon: <LayoutDashboard size={20} /> },
        ];
    }
  };

  const navItems = getNavItems();

  const getRoleBadge = () => {
    switch (role) {
      case 'pme': return <span className="badge badge-amber">PME Collecte</span>;
      case 'factory':
      case 'usine': return <span className="badge badge-blue">Usine Recyclage</span>;
      case 'mairie': return <span className="badge badge-green">Mairie / Collectivité</span>;
      case 'ztt': return <span className="badge badge-green">Centre de Tri ZTT</span>;
      case 'admin': return <span className="badge badge-red">Administration</span>;
      default: return <span className="badge badge-neutral">{role}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* Barre Latérale (Sidebar) */}
      <aside style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 40,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform var(--transition-normal)',
      }} className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* En-tête Sidebar */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/assets/1024-removebg-preview.png" 
              alt="CoVaDeS" 
              style={{ height: '38px', width: 'auto' }}
              onError={(e) => { e.target.src = '/assets/covades.png'; }}
            />
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem', 
                fontWeight: 800, 
                color: 'var(--color-primary)',
                lineHeight: 1
              }}>
                CoVaDeS
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>
                Portail Pro
              </span>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="btn btn-outline btn-sm sidebar-close-btn"
            style={{ display: 'none', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Profil utilisateur résumé */}
        <div style={{
          padding: '16px 24px',
          backgroundColor: 'var(--color-primary-subtle)',
          borderBottom: '1px solid var(--color-border-light)',
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            {user?.name || 'Partenaire CoVaDeS'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {getRoleBadge()}
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {user?.phone || user?.email || ''}
            </span>
          </div>
        </div>

        {/* Navigation principale */}
        <nav style={{ padding: '20px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Liens bas de sidebar (Site public + Déconnexion) */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '8px 12px', 
              color: 'var(--color-text-muted)', 
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ExternalLink size={16} />
            <span>Retour au site public</span>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              color: 'var(--color-danger)',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="dashboard-main">
        {/* Topbar */}
        <header style={{
          height: '70px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn btn-outline btn-sm sidebar-open-btn"
              style={{ display: 'none', padding: '6px' }}
            >
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
              {title || 'Espace Professionnel'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Statut Système / En direct */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span>
              <span>Connecté à l'API</span>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              title="Rafraîchir les données"
              className="btn btn-outline btn-sm"
              style={{ padding: '6px 10px' }}
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </header>

        {/* Zone de contenu spécifique */}
        <main style={{ padding: '28px', flex: 1 }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .dashboard-sidebar {
            transform: translateX(-100%);
          }
          .dashboard-sidebar.open {
            transform: translateX(0);
          }
          .sidebar-close-btn {
            display: inline-flex !important;
          }
          .dashboard-main {
            margin-left: 0 !important;
          }
          .sidebar-open-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
