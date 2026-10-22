import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { zttApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Layers, 
  Trash2, 
  Package, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Scale, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const ZttDashboardPage = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Formulaire de saisie du tri
  const [sortingEntryId, setSortingEntryId] = useState(null);
  const [sortedMaterials, setSortedMaterials] = useState([
    { material: 'plastique', quantity: '', unit: 'kg', quality: 'bonne' },
    { material: 'métal', quantity: '', unit: 'kg', quality: 'bonne' },
  ]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [entriesRes, matRes, statsRes] = await Promise.allSettled([
        zttApi.getEntries(),
        zttApi.getMaterials(),
        zttApi.getStats(),
      ]);

      if (entriesRes.status === 'fulfilled' && entriesRes.value.data?.success) {
        setEntries(entriesRes.value.data.data || []);
      }
      if (matRes.status === 'fulfilled' && matRes.value.data?.success) {
        setMaterials(matRes.value.data.data || []);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
        setStats(statsRes.value.data.data);
      }
    } catch (err) {
      console.error('Erreur données ZTT:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddMaterialRow = () => {
    setSortedMaterials([
      ...sortedMaterials,
      { material: 'verre', quantity: '', unit: 'kg', quality: 'bonne' },
    ]);
  };

  const handleCompleteSorting = async (e) => {
    e.preventDefault();
    if (!sortingEntryId) return;

    setActionLoading(true);
    try {
      const validMaterials = sortedMaterials
        .filter(m => parseFloat(m.quantity) > 0)
        .map(m => ({
          ...m,
          quantity: parseFloat(m.quantity),
        }));

      if (validMaterials.length === 0) {
        alert('Veuillez renseigner au moins une matière avec une quantité supérieure à 0.');
        setActionLoading(false);
        return;
      }

      await zttApi.completeSorting(sortingEntryId, { sortedMaterials: validMaterials });
      alert('Tri validé ! Les matières premières sont désormais disponibles pour les usines de recyclage.');
      setSortingEntryId(null);
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la validation du tri');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DashboardLayout title="Espace ZTT — Centre de Tri & Transit">
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
                Arrivages Enregistrés
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                {entries.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <Trash2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Cargaisons livrées par les PME
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Tris Effectués
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
                {entries.filter(e => e.sortingCompleted).length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Lots ventilés et conditionnés
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Lots pour Usines
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-info)', marginTop: '4px' }}>
                {materials.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-info-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-info)' }}>
              <Package size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Matières en attente de collecte
          </div>
        </div>
      </div>

      {/* 2. Modal/Formulaire de saisie de tri */}
      {sortingEntryId && (
        <div className="card" style={{
          backgroundColor: 'var(--color-primary-subtle)',
          borderColor: 'var(--color-primary)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>
              Saisie et Ventilation du Tri des Matières
            </h3>
            <button 
              type="button" 
              onClick={() => setSortingEntryId(null)} 
              className="btn btn-outline btn-sm"
            >
              Fermer
            </button>
          </div>

          <form onSubmit={handleCompleteSorting}>
            {sortedMaterials.map((row, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '12px',
                backgroundColor: '#FFFFFF',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-light)'
              }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Matière</label>
                  <select 
                    className="form-control"
                    value={row.material}
                    onChange={(e) => {
                      const updated = [...sortedMaterials];
                      updated[index].material = e.target.value;
                      setSortedMaterials(updated);
                    }}
                  >
                    <option value="plastique">Plastique</option>
                    <option value="papier">Papier / Carton</option>
                    <option value="métal">Métal</option>
                    <option value="verre">Verre</option>
                    <option value="organique">Organique</option>
                    <option value="textile">Textile</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Quantité triée</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="form-control" 
                    required 
                    placeholder="Ex: 120"
                    value={row.quantity}
                    onChange={(e) => {
                      const updated = [...sortedMaterials];
                      updated[index].quantity = e.target.value;
                      setSortedMaterials(updated);
                    }}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Unité</label>
                  <select 
                    className="form-control"
                    value={row.unit}
                    onChange={(e) => {
                      const updated = [...sortedMaterials];
                      updated[index].unit = e.target.value;
                      setSortedMaterials(updated);
                    }}
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Qualité</label>
                  <select 
                    className="form-control"
                    value={row.quality}
                    onChange={(e) => {
                      const updated = [...sortedMaterials];
                      updated[index].quality = e.target.value;
                      setSortedMaterials(updated);
                    }}
                  >
                    <option value="excellente">Excellente</option>
                    <option value="bonne">Bonne</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="faible">Faible</option>
                  </select>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              <button type="button" onClick={handleAddMaterialRow} className="btn btn-outline btn-sm">
                <Plus size={14} />
                <span>Ajouter une matière</span>
              </button>
              <button type="submit" disabled={actionLoading} className="btn btn-primary btn-sm">
                <CheckCircle2 size={16} />
                <span>Valider le Tri Définitif</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Liste des arrivages de déchets des PME */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Arrivages de Déchets Bruts Réceptionnés</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
          Cargaisons collectées par les PME et déchargées au centre ZTT
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}><div className="spinner"></div></div>
        ) : entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Date & Référence</th>
                  <th>Poids Reçu</th>
                  <th>État du Tri</th>
                  <th>Action Métier</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>Arrivage #{entry._id.slice(-6).toUpperCase()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {new Date(entry.createdAt).toLocaleString('fr-FR')}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                        {entry.receivedWeight || 0} kg
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${entry.sortingCompleted ? 'badge-green' : 'badge-amber'}`}>
                        {entry.sortingCompleted ? 'Tri Terminé' : 'En attente de tri'}
                      </span>
                    </td>
                    <td>
                      {!entry.sortingCompleted ? (
                        <button
                          onClick={() => setSortingEntryId(entry._id)}
                          className="btn btn-primary btn-sm"
                        >
                          <Layers size={14} />
                          <span>Saisir le Tri</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-success)', fontWeight: 600 }}>
                          ✓ Stock Usine Créé
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '30px 0', color: 'var(--color-text-muted)' }}>
            Aucun arrivage de déchet en attente.
          </p>
        )}
      </div>

      {/* 4. Stocks de matières triées disponibles pour usines */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Stock de Matières Valorisables en Attente</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
          Matières triées prêtes pour enlèvement par les usines de transformation
        </p>

        {materials.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {materials.map((m) => (
              <div key={m._id} style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                backgroundColor: '#FFFFFF',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ textTransform: 'capitalize', fontSize: '1rem' }}>{m.material}</h4>
                  <span className={`badge ${m.status === 'disponible' ? 'badge-green' : 'badge-amber'}`}>
                    {m.status}
                  </span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', margin: '8px 0' }}>
                  {m.quantity} {m.unit || 'kg'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Qualité : {m.quality || 'Standard'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-muted)' }}>
            Aucun stock disponible pour le moment.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ZttDashboardPage;
