import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { mairieApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Layers, 
  BarChart3,
  Factory,
  Clock
} from 'lucide-react';

const MairieDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [pmes, setPmes] = useState([]);
  const [ztts, setZtts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, reportsRes, pmesRes, zttsRes] = await Promise.allSettled([
        mairieApi.getStats(),
        mairieApi.getReports(),
        mairieApi.getPmes(),
        mairieApi.getZtts(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
        setStats(statsRes.value.data.data);
      }
      if (reportsRes.status === 'fulfilled' && reportsRes.value.data?.success) {
        setReports(reportsRes.value.data.data || []);
      }
      if (pmesRes.status === 'fulfilled' && pmesRes.value.data?.success) {
        setPmes(pmesRes.value.data.data || []);
      }
      if (zttsRes.status === 'fulfilled' && zttsRes.value.data?.success) {
        setZtts(zttsRes.value.data.data || []);
      }
    } catch (err) {
      console.error('Erreur données Mairie:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleValidatePme = async (pmeId) => {
    setActionLoading(true);
    try {
      await mairieApi.validatePme(pmeId, { isValidated: true, validationNotes: 'Agréé par la Mairie' });
      alert('PME agréée et autorisée à opérer sur la commune !');
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la validation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleValidateZtt = async (zttId) => {
    setActionLoading(true);
    try {
      await mairieApi.validateZtt(zttId, { isValidated: true });
      alert('Centre ZTT validé avec succès !');
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la validation');
    } finally {
      setActionLoading(false);
    }
  };

  const communeName = user?.mairieInfo?.commune || user?.location?.commune || 'Kaloum';

  return (
    <DashboardLayout title={`Espace Mairie — Supervision Territoriale (${communeName})`}>
      {/* 1. Statistiques Clés */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '28px',
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Total Signalements
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '4px' }}>
                {stats?.totalReports || reports.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <Trash2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Sur le territoire communal
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Déchets Collectés
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
                {reports.filter(r => r.status === 'collectée' || r.status === 'livrée_ztt').length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Évacués par les PME agréées
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                PME Enregistrées
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '4px' }}>
                {pmes.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-warning-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <Building2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Opérateurs de salubrité
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Centres de Tri (ZTT)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-info)', marginTop: '4px' }}>
                {ztts.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-info-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-info)' }}>
              <Factory size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Points de transit et pesée
          </div>
        </div>
      </div>

      {/* 2. Suivi des signalements récents sur la commune */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.15rem' }}>État des Dépôts et Alertes Salubrité dans la Commune</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Suivi en temps réel des signalements émis par les citoyens
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}><div className="spinner"></div></div>
        ) : reports.length > 0 ? (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Quartier / Emplacement</th>
                  <th>Catégorie de Déchet</th>
                  <th>PME Assignée</th>
                  <th>Urgence</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 8).map((r) => (
                  <tr key={r._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>
                        {r.location?.quartier || r.location?.address || 'Quartier non précisé'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {r.location?.coordinates ? `GPS: [${r.location.coordinates[1]?.toFixed(4)}, ${r.location.coordinates[0]?.toFixed(4)}]` : ''}
                      </div>
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{r.category}</span>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Volume : {r.size}</div>
                    </td>
                    <td>
                      {r.assignedPME ? (
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                          {r.assignedPME.name || 'PME Assignée'}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>
                          En attente d'attribution
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${r.priority === 'urgente' ? 'badge-red' : 'badge-neutral'}`}>
                        {r.priority || 'Moyenne'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        r.status === 'collectée' || r.status === 'livrée_ztt' ? 'badge-green' :
                        r.status === 'en_route' ? 'badge-amber' :
                        r.status === 'acceptée' ? 'badge-blue' : 'badge-neutral'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '30px 0', color: 'var(--color-text-muted)' }}>
            Aucun signalement actif recensé dans la commune pour l'instant.
          </p>
        )}
      </div>

      {/* 3. Gestion et Agrément des PME de collecte */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Agrément des PME Partenaires ({pmes.length})</h3>
          {pmes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pmes.map((pme) => (
                <div key={pme._id} style={{
                  padding: '14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{pme.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Tél : {pme.phone} • {pme.location?.address || 'Commune'}
                    </div>
                  </div>
                  <div>
                    <button 
                      onClick={() => handleValidatePme(pme._id)}
                      disabled={actionLoading}
                      className="btn btn-sm btn-secondary"
                    >
                      <ShieldCheck size={14} />
                      <span>Agréer PME</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Aucune PME en attente d'agrément.
            </p>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Centres de Tri & Transit Déclarés ({ztts.length})</h3>
          {ztts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ztts.map((ztt) => (
                <div key={ztt._id} style={{
                  padding: '14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {ztt.zttInfo?.centerName || ztt.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Capacité : {ztt.zttInfo?.capacity || 'Non renseignée'} t/mois
                    </div>
                  </div>
                  <button 
                    onClick={() => handleValidateZtt(ztt._id)}
                    disabled={actionLoading}
                    className="btn btn-sm btn-outline"
                  >
                    Valider Centre
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Aucun centre ZTT répertorié sur la commune.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MairieDashboardPage;
