import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Smartphone 
} from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer style={{
      backgroundColor: '#1B2E10',
      color: '#E5E7EB',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '4px solid var(--color-primary)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Colonne 1 : Présentation & Identité */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/assets/1024-removebg-preview.png" 
                alt="CoVaDeS" 
                style={{ height: '42px', width: 'auto', filter: 'brightness(1.1)' }}
              />
              <span style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem', 
                fontWeight: 800, 
                color: '#FFFFFF' 
              }}>
                CoVaDeS
              </span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px' }}>
              Collecte et Valorisation des Déchets par Signalement. La plateforme numérique éco-citoyenne unissant ménages, PME de collecte, centres de tri ZTT, usines et mairies pour des villes plus propres et durables.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A3E635', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>Système officiel coordonné avec les collectivités</span>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><a href="/#vision" style={{ color: '#9CA3AF' }}>Notre Vision & Mission</a></li>
              <li><a href="/#parcours" style={{ color: '#9CA3AF' }}>Le Parcours du Déchet</a></li>
              <li><a href="/#acteurs" style={{ color: '#9CA3AF' }}>Les 5 Acteurs de la Chaîne</a></li>
              <li><a href="/#marketplace" style={{ color: '#9CA3AF' }}>Produits Recyclés Locaux</a></li>
              <li><a href="/#partenaires" style={{ color: '#9CA3AF' }}>Collectivités & Mairies</a></li>
              <li><a href="/#telecharger" style={{ color: '#9CA3AF' }}>Application Mobile Citoyenne</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Espaces Professionnels */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px' }}>
              Espaces Professionnels
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <Link to="/login" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Espace PME de Collecte</span>
                  <ArrowUpRight size={14} color="#A3E635" />
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Espace Centres de Tri (ZTT)</span>
                  <ArrowUpRight size={14} color="#A3E635" />
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Espace Usines de Valorisation</span>
                  <ArrowUpRight size={14} color="#A3E635" />
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Espace Mairies & Collectivités</span>
                  <ArrowUpRight size={14} color="#A3E635" />
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Portail Super-Administration</span>
                  <ArrowUpRight size={14} color="#A3E635" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact institutionnel */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '18px' }}>
              Contact & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#9CA3AF' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Conakry, République de Guinée (Communes de Kaloum, Dixinn, Matam, Ratoma, Matoto)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span>+224 622 00 00 00 / +224 664 00 00 00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span>contact@covades.gn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne inférieure de copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.85rem',
          color: '#9CA3AF',
        }}>
          <div>
            &copy; {new Date().getFullYear()} CoVaDeS. Tous droits réservés. Plateforme de salubrité publique et d'économie circulaire.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#confidentialite" style={{ color: '#9CA3AF' }}>Politique de confidentialité</a>
            <a href="#cgu" style={{ color: '#9CA3AF' }}>Conditions générales d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
