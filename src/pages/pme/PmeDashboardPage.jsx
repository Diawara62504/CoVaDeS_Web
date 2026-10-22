import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { pmeApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Truck, 
  Trash2, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Send,
  Plus
} from 'lucide-react';

const PmeDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [clients, setClients] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [newCollectorName, setNewCollectorName] = useState('');
  const [newCollectorPhone, setNewCollectorPhone] = useState('');
  const [collectorMsg, setCollectorMsg] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, reportsRes, clientsRes, collectorsRes] = await Promise.allSettled([
        pmeApi.getStats(),
        pmeApi.getReports(),
        pmeApi.getClients(),
        pmeApi.getCollectors(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
        setStats(statsRes.value.data.data);
      }
      if (reportsRes.status === 'fulfilled' && reportsRes.value.data?.success) {
        setReports(reportsRes.value.data.data || []);
      }
      if (clientsRes.status === 'fulfilled' && clientsRes.value.data?.success) {
        setClients(clientsRes.value.data.data || []);
      }
      if (collectorsRes.status === 'fulfilled' && collectorsRes.value.data?.success) {
        setCollectors(collectorsRes.value.data.data || []);
      }
    } catch (err) {
      console.error('Erreur chargement données PME:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (reportId, newStatus) => {
    setActionLoading(true);
    try {
      await pmeApi.updateReportStatus(reportId, newStatus, `Statut mis à jour par la PME`);
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour du statut');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddCollector = async (e) => {
    e.preventDefault();
    if (!newCollectorName || !newCollectorPhone) return;
    try {
      await pmeApi.addCollector({ name: newCollectorName, phone: newCollectorPhone });
      setCollectorMsg('Collecteur ajouté avec succès !');
      setNewCollectorName('');
      setNewCollectorPhone('');
      await loadData();
      setTimeout(() => setCollectorMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'ajout du collecteur');
    }
  };

  const filteredReports = statusFilter === 'all' 
    ? reports 
    : reports.filter((r) => r.status === statusFilter);

  return (
    <DashboardLayout title="Espace PME — Collecte & Ramassage">
      {/* 1. Cartes de statistiques */}
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
                Ménages Abonnés
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                {stats?.activeClients || clients.length || 0}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Clients réguliers souscrits
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Missions Assignées
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '4px' }}>
                {reports.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-warning-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <Truck size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Signalements sur votre zone
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Collectes Terminées
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
            Acheminées ou en transit ZTT
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Agents Collecteurs
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-info)', marginTop: '4px' }}>
                {collectors.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-info-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-info)' }}>
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Effectif opérationnel déployé
          </div>
        </div>
      </div>

      {/* 2. Section Suivi des Signalements */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Signalements et Enlèvements de Déchets</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Gérez les demandes citoyennes transmises depuis l'application mobile Flutter
            </p>
          </div>

          {/* Filtres de statut */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'reçu', 'acceptée', 'en_route', 'collectée', 'livrée_ztt'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-outline'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {st === 'all' ? 'Tous' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>Chargement des signalements...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Catégorie & Détails</th>
                  <th>Emplacement</th>
                  <th>Date & Urgence</th>
                  <th>Statut Actuel</th>
                  <th>Changer de Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{report.category?.toUpperCase() || 'DÉCHET'}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Taille : {report.size || 'Moyenne'} • {report.description || 'Sans description'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                        <MapPin size={14} color="var(--color-primary)" />
                        <span>{report.location?.commune || 'Commune'}, {report.location?.address || 'Adresse'}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <span className={`badge ${report.priority === 'urgente' ? 'badge-red' : 'badge-neutral'}`} style={{ fontSize: '0.72rem' }}>
                        {report.priority || 'Moyenne'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        report.status === 'collectée' || report.status === 'livrée_ztt' ? 'badge-green' :
                        report.status === 'en_route' ? 'badge-amber' :
                        report.status === 'acceptée' ? 'badge-blue' : 'badge-neutral'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {report.status === 'reçu' && (
                          <button
                            onClick={() => handleUpdateStatus(report._id, 'acceptée')}
                            disabled={actionLoading}
                            className="btn btn-sm btn-secondary"
                          >
                            Accepter
                          </button>
                        )}
                        {report.status === 'acceptée' && (
                          <button
                            onClick={() => handleUpdateStatus(report._id, 'en_route')}
                            disabled={actionLoading}
                            className="btn btn-sm btn-outline"
                          >
                            En route
                          </button>
                        )}
                        {report.status === 'en_route' && (
                          <button
                            onClick={() => handleUpdateStatus(report._id, 'collectée')}
                            disabled={actionLoading}
                            className="btn btn-sm btn-primary"
                          >
                            Collecté
                          </button>
                        )}
                        {report.status === 'collectée' && (
                          <button
                            onClick={() => handleUpdateStatus(report._id, 'livrée_ztt')}
                            disabled={actionLoading}
                            className="btn btn-sm btn-secondary"
                          >
                            Livrer ZTT
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--color-text-muted)' }}>
            Aucun signalement trouvé pour ce filtre.
          </div>
        )}
      </div>

      {/* 3. Section Gestion des Collecteurs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Ajouter un collecteur */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Enregistrer un nouveau collecteur</h3>
          {collectorMsg && <div className="alert alert-success">{collectorMsg}</div>}
          <form onSubmit={handleAddCollector}>
            <div className="form-group">
              <label className="form-label">Nom complet de l'agent</label>
              <input 
                type="text" 
                className="form-control" 
                required
                placeholder="Ex: Mamadou Diallo"
                value={newCollectorName}
                onChange={(e) => setNewCollectorName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Numéro de téléphone</label>
              <input 
                type="tel" 
                className="form-control" 
                required
                placeholder="+224 621 00 00 00"
                value={newCollectorPhone}
                onChange={(e) => setNewCollectorPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              <Plus size={16} />
              <span>Ajouter à l'équipe</span>
            </button>
          </form>
        </div>

        {/* Liste de l'équipe */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Équipe d'agents de terrain ({collectors.length})</h3>
          {collectors.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {collectors.map((c, i) => (
                <div key={c._id || i} style={{
                  padding: '12px 14px',
                  backgroundColor: 'var(--color-primary-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name || 'Collecteur'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{c.phone || ''}</div>
                  </div>
                  <span className="badge badge-green">Actif</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Aucun agent enregistré pour le moment.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PmeDashboardPage;
