import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import { 
  Building2, 
  Truck, 
  Factory, 
  Layers, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'pme',
    commune: 'Kaloum',
    address: '',
    businessName: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        location: {
          city: 'Conakry',
          commune: formData.commune,
          address: formData.address || formData.commune,
        },
        pmeInfo: formData.role === 'pme' ? { businessName: formData.businessName || formData.name } : undefined,
        factoryInfo: formData.role === 'factory' ? { factoryName: formData.businessName || formData.name } : undefined,
        zttInfo: formData.role === 'ztt' ? { centerName: formData.businessName || formData.name } : undefined,
      };

      const res = await authApi.register(payload);
      if (res.data?.success) {
        setSuccessMessage('Compte partenaire créé avec succès ! Vous pouvez maintenant vous connecter.');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        setErrorMessage(res.data?.message || 'Erreur lors de la création du compte.');
      }
    } catch (err) {
      console.error('Erreur inscription:', err);
      const msg = err.response?.data?.message || err.message || 'Échec de l\'enregistrement';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-body)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto' }}>
        <Link 
          to="/login" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            marginBottom: '20px',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={16} />
          <span>Retour à la connexion</span>
        </Link>

        <div className="card" style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', marginBottom: '6px' }}>
              Demande de Compte Partenaire
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Rejoignez le réseau CoVaDeS (PME, Usines, Mairies, ZTT)
            </p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Type d'Acteur</label>
              <select 
                name="role" 
                className="form-control" 
                value={formData.role} 
                onChange={handleChange}
              >
                <option value="pme">PME de Collecte et Ramassage</option>
                <option value="factory">Usine de Recyclage et Transformation</option>
                <option value="ztt">Centre de Tri et de Transit (ZTT)</option>
                <option value="mairie">Mairie / Collectivité Locale</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Nom de l'organisation ou de l'entreprise</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                required
                placeholder="Ex: Guinée Recyclage Express SARL"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Téléphone officiel</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="form-control" 
                  required
                  placeholder="+224 620 00 00 00"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email professionnel</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="contact@entreprise.gn"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Commune d'implantation</label>
                <select 
                  name="commune" 
                  className="form-control"
                  value={formData.commune}
                  onChange={handleChange}
                >
                  <option value="Kaloum">Kaloum</option>
                  <option value="Dixinn">Dixinn</option>
                  <option value="Matam">Matam</option>
                  <option value="Ratoma">Ratoma</option>
                  <option value="Matoto">Matoto</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Adresse / Quartier</label>
                <input 
                  type="text" 
                  name="address" 
                  className="form-control" 
                  placeholder="Ex: Almamya, Boulbinet..."
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Mot de passe</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  required
                  placeholder="Min. 6 caractères"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className="form-control" 
                  required
                  placeholder="Répétez le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '20px',
              display: 'flex',
              gap: '10px'
            }}>
              <ShieldCheck size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                Les comptes PME et ZTT sont soumis à la validation réglementaire de la Mairie compétente avant autorisation complète des opérations de collecte.
              </span>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px', borderColor: '#FFFFFF', borderTopColor: 'transparent' }}></div>
                  <span>Création du compte...</span>
                </>
              ) : (
                <span>Soumettre la demande de compte</span>
              )}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Vous avez déjà un compte ?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
