import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LogIn, 
  Lock, 
  Phone, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  Building2,
  Truck,
  Factory,
  Layers
} from 'lucide-react';

const LoginPage = () => {
  const { login, getDefaultRouteForRole, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Si déjà connecté, rediriger directement vers le dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const target = location.state?.from?.pathname || getDefaultRouteForRole(user.role);
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location, getDefaultRouteForRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const loggedUser = await login(identifier, password);
      const destination = location.state?.from?.pathname || getDefaultRouteForRole(loggedUser.role);
      navigate(destination, { replace: true });
    } catch (err) {
      console.error('Erreur connexion:', err);
      const backendMsg = err.response?.data?.message || err.message || 'Identifiants invalides';
      setErrorMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  // Remplissage rapide pour les tests de démonstration
  const handleQuickFill = (phone, pass) => {
    setIdentifier(phone);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-body)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
        {/* Bouton retour accueil */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginBottom: '24px',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={16} />
          <span>Retour au site public</span>
        </Link>

        {/* Carte de Connexion */}
        <div className="card" style={{ padding: '36px 32px' }}>
          {/* Logo & Titre */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img 
              src="/assets/1024-removebg-preview.png" 
              alt="CoVaDeS Logo" 
              style={{ height: '56px', width: 'auto', margin: '0 auto 12px' }}
              onError={(e) => { e.target.src = '/assets/covades.png'; }}
            />
            <h1 style={{ fontSize: '1.6rem', color: 'var(--color-text-main)', marginBottom: '6px' }}>
              Espace Professionnel
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Connectez-vous pour accéder à votre tableau de bord CoVaDeS
            </p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Numéro de téléphone ou Email</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ paddingLeft: '40px' }}
                  required
                  placeholder="+224 620 00 00 00 ou email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={loading}
                />
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-light)'
                }}>
                  {identifier.includes('@') ? <Mail size={18} /> : <Phone size={18} />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Mot de passe</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  className="form-control" 
                  style={{ paddingLeft: '40px' }}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-light)'
                }}>
                  <Lock size={18} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%', marginTop: '10px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderColor: '#FFFFFF', borderTopColor: 'transparent' }}></div>
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Séparateur pour les profils de démonstration */}
          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border-light)',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px', textAlign: 'center', fontWeight: 600 }}>
              Accès rapide démonstration (identifiants tests) :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                type="button" 
                onClick={() => handleQuickFill('+224622111111', 'pme123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Truck size={14} color="var(--color-warning)" />
                <span>PME Collecte</span>
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickFill('+224622222222', 'usine123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Factory size={14} color="var(--color-info)" />
                <span>Usine Recyclage</span>
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickFill('+224622333333', 'mairie123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Building2 size={14} color="var(--color-primary)" />
                <span>Mairie Kaloum</span>
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickFill('+224622444444', 'ztt123')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.78rem', justifyContent: 'flex-start' }}
              >
                <Layers size={14} color="var(--color-primary-dark)" />
                <span>Centre ZTT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lien vers inscription */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Vous êtes un nouvel acteur ?{' '}
          <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Demander un compte partenaire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
