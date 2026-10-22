import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getDefaultRouteForRole } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  Smartphone, 
  LogIn, 
  LayoutDashboard, 
  ArrowRight
} from 'lucide-react';

const PublicNavbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    if (user) {
      navigate(getDefaultRouteForRole(user.role));
    } else {
      navigate('/login');
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-xs)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
        gap: '16px',
      }}>
        {/* Logo & Identité CoVaDeS */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <img 
            src="/assets/1024-removebg-preview.png" 
            alt="CoVaDeS Logo" 
            style={{ height: '38px', width: 'auto' }}
            onError={(e) => {
              e.target.src = '/assets/covades.png';
            }}
          />
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
              display: 'block',
              lineHeight: 1
            }}>
              CoVaDeS
            </span>
            <span className="navbar-subtitle" style={{ 
              fontSize: '0.68rem', 
              fontWeight: 500, 
              color: 'var(--color-text-muted)',
              display: 'block',
              marginTop: '2px',
              whiteSpace: 'nowrap'
            }}>
              Collecte & Valorisation des Déchets
            </span>
          </div>
        </Link>

        {/* Menu Central Desktop (Intitulés courts, 1 ligne stricte) */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '24px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.9rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }} className="desktop-nav">
          <a href="/#vision" className="nav-link">Mission</a>
          <a href="/#parcours" className="nav-link">Parcours</a>
          <a href="/#acteurs" className="nav-link">Acteurs</a>
          <a href="/#marketplace" className="nav-link">Produits</a>
          <a href="/#partenaires" className="nav-link">Partenaires</a>
          <a href="/#contact" className="nav-link">Contact</a>
        </nav>

        {/* Actions Droite : App Mobile (discret) + Espace Pro (principal vert) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Bouton secondaire discret App mobile */}
          <a 
            href="/#telecharger" 
            className="btn btn-outline btn-sm nav-app-link"
            style={{
              display: 'none',
              padding: '7px 14px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              borderColor: 'var(--color-border)',
              whiteSpace: 'nowrap'
            }}
          >
            <Smartphone size={15} color="var(--color-primary)" />
            <span>App mobile</span>
          </a>

          {/* Bouton d'action principal Espace Pro */}
          {isAuthenticated && user ? (
            <button 
              onClick={handleDashboardClick} 
              className="btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              <LayoutDashboard size={15} />
              <span>Espace {user.role?.toUpperCase()}</span>
            </button>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              <LogIn size={15} />
              <span>Espace Pro</span>
            </Link>
          )}

          {/* Bouton Hamburger Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="btn btn-outline btn-sm mobile-menu-btn"
            style={{ padding: '6px 8px', display: 'none' }}
            aria-label="Ouvrir le menu de navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Déroulant Mobile avec animation douce */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-md)',
        }}>
          <a href="/#vision" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Mission</a>
          <a href="/#parcours" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Parcours</a>
          <a href="/#acteurs" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Acteurs</a>
          <a href="/#marketplace" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Produits</a>
          <a href="/#partenaires" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Partenaires</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} style={{ padding: '6px 0', fontWeight: 600 }}>Contact</a>
          
          <div style={{
            borderTop: '1px solid var(--color-border-light)',
            paddingTop: '12px',
            display: 'flex',
            gap: '10px'
          }}>
            <a 
              href="/#telecharger" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-outline btn-sm" 
              style={{ flex: 1 }}
            >
              <Smartphone size={15} />
              <span>App mobile</span>
            </a>
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm" 
              style={{ flex: 1 }}
            >
              <LogIn size={15} />
              <span>Espace Pro</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          color: var(--color-text-main);
          transition: color var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--color-primary);
        }
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .nav-app-link { display: inline-flex !important; }
        }
        @media (max-width: 959px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
        @media (max-width: 1100px) {
          .navbar-subtitle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default PublicNavbar;
