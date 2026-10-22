import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { adminApi } from '../../services/api';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Search,
  Building2,
  Factory
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Formulaire nouvelle zone
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [newZone, setNewZone] = useState({ name: '', commune: 'Kaloum', description: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, zonesRes, catRes] = await Promise.allSettled([
        adminApi.getStats(),
        adminApi.getAllUsers(),
        adminApi.getAllZones(),
        adminApi.getAllCategories(),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
        setStats(statsRes.value.data.data);
      }
      if (usersRes.status === 'fulfilled' && usersRes.value.data?.success) {
        setUsers(usersRes.value.data.data || []);
      }
      if (zonesRes.status === 'fulfilled' && zonesRes.value.data?.success) {
        setZones(zonesRes.value.data.data || []);
      }
      if (catRes.status === 'fulfilled' && catRes.value.data?.success) {
        setCategories(catRes.value.data.data || []);
      }
    } catch (err) {
      console.error('Erreur données Admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleUserStatus = async (userId, currentActive) => {
    try {
      await adminApi.updateUser(userId, { isActive: !currentActive });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors du changement de statut');
    }
  };

  const handleCreateZone = async (e) => {
    e.preventDefault();
    try {
      await adminApi.createZone(newZone);
      setShowZoneModal(false);
      setNewZone({ name: '', commune: 'Kaloum', description: '' });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la création de la zone');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.phone || '').includes(searchTerm) ||
                          (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout title="Portail Administration CoVaDeS — Supervision Système">
      {/* 1. Statistiques Globales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '28px',
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Utilisateurs Totaux
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
            {stats?.users?.total || users.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Tous rôles confondus
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Signalements Enregistrés
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '4px' }}>
            {stats?.reports?.total || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Flux global citoyen
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Zones Territoriales
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-info)', marginTop: '4px' }}>
            {zones.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Périmètres de collecte
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Filières de Déchets
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
            {categories.length || 8}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Catégories actives
          </div>
        </div>
      </div>

      {/* 2. Gestion des Utilisateurs & Partenaires */}
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
            <h3 style={{ fontSize: '1.15rem' }}>Gestion des Comptes Utilisateurs ({filteredUsers.length})</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Supervision des partenaires PME, Usines, Mairies, ZTT et Citoyens
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-control" 
                style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
                placeholder="Rechercher nom, tél..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
            </div>

            <select 
              className="form-control" 
              style={{ fontSize: '0.85rem', width: 'auto' }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Tous les rôles</option>
              <option value="citizen">Citoyen</option>
              <option value="pme">PME</option>
              <option value="factory">Usine</option>
              <option value="mairie">Mairie</option>
              <option value="ztt">ZTT</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}><div className="spinner"></div></div>
        ) : filteredUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Nom / Organisation</th>
                  <th>Contact</th>
                  <th>Rôle</th>
                  <th>Commune</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>ID: {u._id}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.88rem' }}>{u.phone}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{u.email || '-'}</div>
                    </td>
                    <td>
                      <span className={`badge ${
                        u.role === 'admin' ? 'badge-red' :
                        u.role === 'pme' ? 'badge-amber' :
                        u.role === 'factory' ? 'badge-blue' :
                        u.role === 'mairie' ? 'badge-green' : 'badge-neutral'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.88rem' }}>{u.location?.commune || '-'}</span>
                    </td>
                    <td>
                      <span className={`badge ${u.isActive !== false ? 'badge-green' : 'badge-red'}`}>
                        {u.isActive !== false ? 'Actif' : 'Suspendu'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleUserStatus(u._id, u.isActive !== false)}
                        className={`btn btn-sm ${u.isActive !== false ? 'btn-outline' : 'btn-secondary'}`}
                        style={{ fontSize: '0.78rem' }}
                      >
                        {u.isActive !== false ? 'Suspendre' : 'Activer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-muted)' }}>
            Aucun utilisateur trouvé.
          </p>
        )}
      </div>

      {/* 3. Découpage des zones de collecte */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Découpage des Zones Territoriales ({zones.length})</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Périmètres assignés aux PME par les municipalités
            </p>
          </div>
          <button onClick={() => setShowZoneModal(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Créer une Zone</span>
          </button>
        </div>

        {showZoneModal && (
          <div style={{
            backgroundColor: 'var(--color-primary-subtle)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
          }}>
            <form onSubmit={handleCreateZone}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Nom de la Zone</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="Ex: Zone 1 - Centre Almamya"
                    value={newZone.name}
                    onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Commune</label>
                  <select 
                    className="form-control"
                    value={newZone.commune}
                    onChange={(e) => setNewZone({ ...newZone, commune: e.target.value })}
                  >
                    <option value="Kaloum">Kaloum</option>
                    <option value="Dixinn">Dixinn</option>
                    <option value="Matam">Matam</option>
                    <option value="Ratoma">Ratoma</option>
                    <option value="Matoto">Matoto</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowZoneModal(false)} className="btn btn-outline btn-sm">Annuler</button>
                <button type="submit" className="btn btn-primary btn-sm">Enregistrer</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {zones.map((z) => (
            <div key={z._id} style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              backgroundColor: '#FFFFFF',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                {z.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Commune : {z.commune}
              </div>
              <div style={{ fontSize: '0.78rem', color: z.assignedPME ? 'var(--color-primary)' : 'var(--color-warning)', marginTop: '8px', fontWeight: 600 }}>
                {z.assignedPME ? 'PME Affectée' : 'Zone non assignée'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
