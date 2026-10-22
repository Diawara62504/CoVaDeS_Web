import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import { publicApi } from '../../services/api';
import { 
  Camera, 
  Truck, 
  Layers, 
  Factory, 
  Building2, 
  Users, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Recycle, 
  MapPin, 
  Package, 
  Send, 
  Clock,
  Sparkles,
  Leaf
} from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    entityType: 'pme',
    commune: 'Conakry',
    message: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicApi.getProducts();
        if (res.data?.success && Array.isArray(res.data?.data)) {
          setProducts(res.data.data.slice(0, 6));
        }
      } catch (err) {
        console.warn('Chargement des produits:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        entityType: 'pme',
        commune: 'Conakry',
        message: ''
      });
    }, 5000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <PublicNavbar />

      <main style={{ flex: 1 }}>
        {/* ========================================================
            1. HERO SECTION REVUE (PRODUIT, MOCKUP & ANIMATIONS)
            ======================================================== */}
        <section style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          paddingTop: '80px',
          paddingBottom: '96px',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}>
          {/* Halos d'ambiance très doux */}
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>

          <div className="container" style={{
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}>
            {/* Colonne Gauche : Titre, Explication, CTA & Indicateurs */}
            <div style={{ maxWidth: '580px' }}>
              {/* Badge d'en-tête sobre */}
              <div 
                className="animate-fade-up"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--color-primary-dark)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}
              >
                <ShieldCheck size={15} />
                <span>Plateforme de Salubrité & Économie Circulaire</span>
              </div>

              {/* Titre Principal (2 à 3 lignes max, équilibré) */}
              <h1 
                className="animate-fade-up"
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  marginBottom: '20px',
                }}
              >
                Collecte et <span style={{ color: 'var(--color-primary)' }}>valorisation des déchets</span> par signalement citoyen
              </h1>

              {/* Paragraphe descriptif sans accumulation de gras */}
              <p 
                className="animate-fade-up delay-100"
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.65',
                  color: '#475569',
                  marginBottom: '32px',
                }}
              >
                CoVaDeS connecte directement les ménages, les PME de ramassage, les centres de tri ZTT, les usines de recyclage et les municipalités pour éradiquer les dépotoirs sauvages et alimenter l'économie circulaire locale.
              </p>

              {/* Boutons d'action CTA */}
              <div 
                className="animate-fade-up delay-200"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}
              >
                <a href="#telecharger" className="btn btn-primary btn-lg">
                  <Smartphone size={19} />
                  <span>Télécharger l'Application</span>
                </a>
                <Link to="/login" className="btn btn-outline btn-lg">
                  <span>Accéder à l'Espace Pro</span>
                  <ArrowRight size={17} />
                </Link>
              </div>

              {/* Indicateurs de confiance alignés sur une seule rangée */}
              <div 
                className="animate-fade-up delay-300"
                style={{
                  marginTop: '36px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  fontSize: '0.86rem',
                  color: '#475569',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={16} color="var(--color-primary)" />
                  <span>Signalement géolocalisé</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={16} color="var(--color-primary)" />
                  <span>Traçabilité de bout en bout</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={16} color="var(--color-primary)" />
                  <span>Coordination Mairie & PME</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Composition Produit (Mockup Smartphone + Radar + Cartes Flottantes) */}
            <div 
              className="animate-fade-up delay-400"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 10px',
              }}
            >
              {/* Mockup Smartphone Moderne */}
              <div style={{
                position: 'relative',
                width: '300px',
                height: '590px',
                backgroundColor: '#1E293B',
                borderRadius: '42px',
                padding: '10px',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                border: '4px solid #334155',
                zIndex: 2,
              }}>
                {/* Haut-parleur / Encoche supérieure */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '16px',
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#334155' }}></div>
                  <div style={{ width: '32px', height: '3px', borderRadius: '2px', backgroundColor: '#334155' }}></div>
                </div>

                {/* Écran Intérieur du Smartphone */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  {/* Barre d'état de l'application CoVaDeS Mobile */}
                  <div style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    padding: '24px 16px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img 
                        src="/assets/1024-removebg-preview.png" 
                        alt="Logo" 
                        style={{ height: '22px', width: 'auto', filter: 'brightness(1.2)' }}
                      />
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>CoVaDeS</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', opacity: 0.9 }}>
                      <MapPin size={12} />
                      <span>Kaloum, Conakry</span>
                    </div>
                  </div>

                  {/* Carte Interactive Stylisée avec Radar Géolocalisé */}
                  <div style={{
                    flex: 1,
                    backgroundColor: '#E2E8F0',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: `
                      radial-gradient(#CBD5E1 1.5px, transparent 1.5px),
                      linear-gradient(to right, rgba(203, 213, 225, 0.4) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(203, 213, 225, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px, 48px 48px, 48px 48px',
                  }}>
                    {/* Voies routières stylisées de la carte */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.7 }} viewBox="0 0 280 400">
                      <path d="M 0,160 Q 140,140 280,200" stroke="#FFFFFF" strokeWidth="10" fill="none" />
                      <path d="M 120,0 L 140,400" stroke="#FFFFFF" strokeWidth="8" fill="none" />
                      <path d="M 40,260 L 280,100" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                    </svg>

                    {/* Zone d'intervention PME */}
                    <div style={{
                      position: 'absolute',
                      top: '110px',
                      left: '40px',
                      width: '180px',
                      height: '140px',
                      border: '2px dashed rgba(83, 141, 34, 0.45)',
                      backgroundColor: 'rgba(83, 141, 34, 0.08)',
                      borderRadius: '16px',
                    }}></div>

                    {/* Point Géolocalisé avec Ondes Radar */}
                    <div style={{
                      position: 'absolute',
                      top: '170px',
                      left: '120px',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div className="radar-wave"></div>
                      <div className="radar-wave radar-wave-delayed"></div>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        border: '3px solid #FFFFFF',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        zIndex: 5,
                      }}></div>
                    </div>

                    {/* Badge sur la carte du smartphone */}
                    <div style={{
                      position: 'absolute',
                      top: '135px',
                      left: '130px',
                      backgroundColor: '#FFFFFF',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span>
                      <span>Signalement #CK-104</span>
                    </div>
                  </div>

                  {/* Fiche d'intervention au bas de l'écran du smartphone */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid var(--color-border)',
                    padding: '14px',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.03)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                        Plastique & Cartons
                      </span>
                      <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                        En route
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                      PME assignée : <strong style={{ color: 'var(--color-text-main)' }}>Salubrité Kaloum</strong> • 120 kg
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}>
                      <Camera size={14} />
                      <span>Nouveau Signalement</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pastille Flottante 1 : « Zéro déchet abandonné » (Haut Gauche) */}
              <div 
                className="floating-card"
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '-24px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  zIndex: 10,
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Leaf size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    Zéro déchet abandonné
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    100% orienté vers le tri & recyclage
                  </div>
                </div>
              </div>

              {/* Pastille Flottante 2 : Micro-carte statut (Bas Droite) */}
              <div 
                className="floating-card"
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  right: '-20px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  zIndex: 10,
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    Signalement validé
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    Pris en charge par la PME
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. SECTION NOTRE MISSION & VISION (PROBLÈME / SOLUTION)
            ======================================================== */}
        <section id="vision" style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-body)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
              <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                Salubrité & Environnement
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                Répondre durablement au défi de la salubrité urbaine
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: '1.6' }}>
                Dans de nombreuses villes, la rupture de la chaîne entre le dépôt des ordures et leur ramassage crée des décharges spontanées. CoVaDeS apporte une réponse opérationnelle grâce au numérique et à la synergie territoriale.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Camera size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>Le Signalement Éco-Citoyen</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                  Chaque citoyen muni de son smartphone peut photographier un amoncellement de déchets, préciser la catégorie (plastique, organique, métaux) et transmettre sa position GPS exacte.
                </p>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: 'var(--color-warning-bg)',
                  color: 'var(--color-warning)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Truck size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>L'Organisation des Collectes</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                  Les PME de ramassage agréées par les mairies reçoivent les alertes en temps réel dans leur zone d'intervention, planifient l'itinéraire des collecteurs et valident l'enlèvement.
                </p>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: 'var(--color-info-bg)',
                  color: 'var(--color-info)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Factory size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>La Valorisation Industrielle</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: '#475569' }}>
                  Les déchets triés en ZTT deviennent des matières premières secondaires commercialisables pour les usines partenaires qui créent des produits utiles pour l'économie locale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. LE PARCOURS DES DÉCHETS EN 4 ÉTAPES CLÉS
            ======================================================== */}
        <section id="parcours" style={{
          padding: '80px 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
              <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                Processus opérationnel
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                De la rue à l'usine : le parcours complet du déchet
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#475569' }}>
                Chaque étape est enregistrée dans le système pour assurer une traçabilité totale et transparente.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}>
              {/* Étape 1 */}
              <div className="card" style={{ position: 'relative' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  01
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Signalement Citoyen</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  Photo, catégorie (plastique, carton, métal...) et coordonnées GPS transmises depuis l'application mobile Flutter.
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Statut : Reçu
                </div>
              </div>

              {/* Étape 2 */}
              <div className="card" style={{ position: 'relative' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  02
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Collecte par la PME</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  Attribution automatique selon la zone communale, départ des agents collecteurs, chargement et évacuation.
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-warning)' }}>
                  Statut : Acceptée & Collectée
                </div>
              </div>

              {/* Étape 3 */}
              <div className="card" style={{ position: 'relative' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  03
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Tri Sélectif en ZTT</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  Arrivée au centre de transit, pesée, tri mécanique et manuel, conditionnement par qualité et mise en stock disponible.
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-info)' }}>
                  Statut : Trié & Matière disponible
                </div>
              </div>

              {/* Étape 4 */}
              <div className="card" style={{ position: 'relative' }}>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  04
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Recyclage en Usine</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6' }}>
                  Achat et transport vers l'usine partenaire, fonte, transformation et création de nouveaux objets éco-responsables.
                </p>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success)' }}>
                  Statut : Valorisé en produit fini
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. LES 5 ACTEURS CLÉS DE LA PLATEFORME
            ======================================================== */}
        <section id="acteurs" style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-body)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px' }}>
              <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                Synergie territoriale
              </span>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                Une plateforme unifiée pour tous les acteurs
              </h2>
              <p style={{ fontSize: '1.02rem', color: '#475569' }}>
                Chaque profil dispose d'un espace adapté avec des droits d'accès stricts et des outils métier dédiés.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {/* Citoyens */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-primary)', flexShrink: 0 }}>
                  <Users size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Citoyens & Ménages</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Signalent les points de dépôt d'ordures, souscrivent des abonnements mensuels de ramassage et achètent des produits recyclés.
                  </p>
                  <span className="badge badge-green">Accès : Application Mobile Flutter</span>
                </div>
              </div>

              {/* PME */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-warning)', flexShrink: 0 }}>
                  <Truck size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>PME de Collecte</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Gèrent leur flotte de collecteurs, traitent les signalements de leur zone communale et transportent les déchets vers les centres ZTT.
                  </p>
                  <Link to="/login" className="btn btn-outline btn-sm">Accès Espace PME</Link>
                </div>
              </div>

              {/* ZTT */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-primary-dark)', flexShrink: 0 }}>
                  <Layers size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Centres de Tri (ZTT)</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Enregistrent les arrivages de déchets, pèsent les cargaisons et saisissent le résultat du tri sélectif par type de matière.
                  </p>
                  <Link to="/login" className="btn btn-outline btn-sm">Accès Espace ZTT</Link>
                </div>
              </div>

              {/* Usines */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-info)', flexShrink: 0 }}>
                  <Factory size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Usines de Valorisation</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Consultent le catalogue des matières disponibles en ZTT, réservent leurs approvisionnements et publient leurs produits recyclés.
                  </p>
                  <Link to="/login" className="btn btn-outline btn-sm">Accès Espace Usine</Link>
                </div>
              </div>

              {/* Mairies */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-primary)', flexShrink: 0 }}>
                  <Building2 size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Mairies & Collectivités</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Supervisent la salubrité de leur commune sur carte SIG, agréent les PME locales et analysent les statistiques environnementales.
                  </p>
                  <Link to="/login" className="btn btn-outline btn-sm">Accès Espace Mairie</Link>
                </div>
              </div>

              {/* Administration */}
              <div className="card" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ color: 'var(--color-danger)', flexShrink: 0 }}>
                  <ShieldCheck size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Super-Administration CoVaDeS</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '12px' }}>
                    Contrôle des comptes partenaires, validation des accès, découpage des zones et supervision globale des flux.
                  </p>
                  <Link to="/login" className="btn btn-outline btn-sm">Accès Super-Admin</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. MARKETPLACE / PRODUITS RECYCLÉS (DONNÉES BACKEND)
            ======================================================== */}
        <section id="marketplace" style={{
          padding: '80px 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '48px',
            }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                  Économie circulaire concrète
                </span>
                <h2 style={{ fontSize: '2.2rem' }}>Produits issus du recyclage local</h2>
                <p style={{ fontSize: '1rem', color: '#475569', marginTop: '8px' }}>
                  Découvrez les biens fabriqués par les usines partenaires à partir des matières triées en ZTT.
                </p>
              </div>
            </div>

            {loadingProducts ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div className="spinner" style={{ width: '30px', height: '30px' }}></div>
                <p style={{ marginTop: '12px', fontSize: '0.88rem', color: '#64748B' }}>
                  Chargement des produits disponibles...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '28px',
              }}>
                {products.map((prod) => (
                  <div key={prod._id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '200px', backgroundColor: '#F1F5F9', position: 'relative' }}>
                      <img 
                        src={prod.images?.[0] || '/assets/panier_ecologique.jpeg'} 
                        alt={prod.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/assets/engrais_bio.jpeg'; }}
                      />
                      <span className="badge badge-green" style={{ position: 'absolute', top: '12px', right: '12px' }}>
                        {prod.category || 'Recyclé'}
                      </span>
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{prod.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '16px', flex: 1 }}>
                        {prod.description || 'Produit fabriqué à partir de matières recyclées collectées via CoVaDeS.'}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--color-border-light)'
                      }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {prod.price?.toLocaleString()} {prod.currency || 'GNF'}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          Stock : {prod.stock || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Présentation si aucun produit n'est encore enregistré en DB */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/panier_ecologique.jpeg" alt="Paniers recyclés" style={{ height: '190px', width: '100%', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '6px' }}>Paniers & Rangements Écologiques</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px' }}>
                      Fabriqués par tressage et thermoformage de polymères plastiques recyclés.
                    </p>
                    <span className="badge badge-green">Filière Plastique</span>
                  </div>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/engrais_bio.jpeg" alt="Compost & Engrais Bio" style={{ height: '190px', width: '100%', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '6px' }}>Compost & Engrais Organique Enrichi</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px' }}>
                      Valorisation agro-écologique des biodéchets des marchés et des ménages.
                    </p>
                    <span className="badge badge-green">Filière Organique</span>
                  </div>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src="/assets/mini_metal_buckets.jpeg" alt="Conteneurs métalliques" style={{ height: '190px', width: '100%', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '6px' }}>Bacs & Conteneurs Métalliques</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '12px' }}>
                      Produits de fonderie artisanale à partir de débris de métaux et canettes récupérés.
                    </p>
                    <span className="badge badge-green">Filière Métaux</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            6. SECTION TÉLÉCHARGEMENT DE L'APPLICATION MOBILE
            ======================================================== */}
        <section id="telecharger" style={{
          padding: '80px 0',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
        }}>
          <div className="container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div>
              <span style={{
                display: 'inline-block',
                padding: '5px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '18px',
              }}>
                Pour les citoyens & usagers
              </span>
              <h2 style={{ fontSize: '2.3rem', color: '#FFFFFF', marginBottom: '18px', lineHeight: 1.2 }}>
                Participez à la propreté de votre quartier depuis votre téléphone
              </h2>
              <p style={{ fontSize: '1.02rem', color: 'rgba(255, 255, 255, 0.92)', lineHeight: '1.6', marginBottom: '28px' }}>
                L'application mobile officielle CoVaDeS (construite avec Flutter) vous permet de signaler instantanément les dépotoirs sauvages, de suivre leur ramassage par les PME et de vous abonner au service de collecte régulier.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a 
                  href="/CoVaDeS.apk" 
                  download 
                  className="btn"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-primary-dark)',
                    padding: '13px 26px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Smartphone size={19} />
                  <span>Télécharger l'APK Android (v1.0)</span>
                </a>
              </div>
              <p style={{ marginTop: '14px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Fichier officiel testé et certifié — Compatible avec Android 6.0 et ultérieur
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img 
                src="/assets/logoSA.png" 
                alt="CoVaDeS Mobile App"
                style={{
                  maxWidth: '300px',
                  margin: '0 auto',
                  filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))',
                }}
              />
            </div>
          </div>
        </section>

        {/* ========================================================
            7. PARTENAIRES, COLLECTIVITÉS & FORMULAIRE DE CONTACT
            ======================================================== */}
        <section id="partenaires" style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
            }}>
              {/* Informations institutionnelles */}
              <div>
                <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                  Collaboration & Collectivités
                </span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                  Vous représentez une Mairie, une PME ou une Usine ?
                </h2>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                  CoVaDeS déploie des partenariats officiels avec les municipalités et les acteurs de la filière pour organiser la gestion des déchets à l'échelle de chaque commune.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>
                      <Building2 size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Pour les Mairies</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                        Cartographie SIG en direct, agrément des PME et rapports d'impact territorial téléchargeables.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>
                      <Truck size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Pour les PME de ramassage</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                        Accès à la liste des signalements géolocalisés et gestion de vos clients abonnés.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>
                      <Factory size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Pour les Usines de transformation</h4>
                      <p style={{ fontSize: '0.88rem', color: '#475569' }}>
                        Approvisionnement sécurisé en matières premières triées auprès des centres ZTT.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Link to="/register" className="btn btn-secondary">
                    <span>Créer un compte partenaire</span>
                  </Link>
                  <Link to="/login" className="btn btn-outline">
                    <span>Se connecter</span>
                  </Link>
                </div>
              </div>

              {/* Formulaire de Contact & Demande d'agrément */}
              <div id="contact" className="card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                  Demande d'information ou de partenariat
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#64748B', marginBottom: '24px' }}>
                  Transmettez votre demande à l'équipe de coordination CoVaDeS.
                </p>

                {contactSuccess && (
                  <div className="alert alert-success">
                    <CheckCircle2 size={18} />
                    <span>Votre message a été transmis avec succès. Notre équipe vous recontactera sous 24h.</span>
                  </div>
                )}

                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nom complet ou Entité</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required
                      placeholder="Ex: PME Salubrité Pro / Mairie de Kaloum"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        required
                        placeholder="+224 620 00 00 00"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="contact@organisation.gn"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Type d'acteur</label>
                      <select 
                        className="form-control"
                        value={contactForm.entityType}
                        onChange={(e) => setContactForm({ ...contactForm, entityType: e.target.value })}
                      >
                        <option value="pme">PME de collecte</option>
                        <option value="mairie">Mairie / Collectivité</option>
                        <option value="ztt">Centre de Tri (ZTT)</option>
                        <option value="factory">Usine de recyclage</option>
                        <option value="autre">Autre organisme</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Commune d'activité</label>
                      <select 
                        className="form-control"
                        value={contactForm.commune}
                        onChange={(e) => setContactForm({ ...contactForm, commune: e.target.value })}
                      >
                        <option value="Kaloum">Kaloum</option>
                        <option value="Dixinn">Dixinn</option>
                        <option value="Matam">Matam</option>
                        <option value="Ratoma">Ratoma</option>
                        <option value="Matoto">Matoto</option>
                        <option value="Autre">Autre région</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Votre message ou objet de la demande</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      required
                      placeholder="Précisez votre demande d'adhésion, d'agrément ou vos besoins d'approvisionnement..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={16} />
                    <span>Envoyer la demande</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default HomePage;
