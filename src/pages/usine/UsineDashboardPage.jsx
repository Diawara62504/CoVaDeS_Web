import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { factoryApi } from '../../services/api';
import { 
  Factory, 
  Layers, 
  Package, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  TrendingUp, 
  ShoppingBag,
  Clock,
  ArrowRight
} from 'lucide-react';

const UsineDashboardPage = () => {
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Formulaire nouveau produit
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'meuble',
    price: '',
    stock: '',
    description: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [matRes, prodRes, statsRes] = await Promise.allSettled([
        factoryApi.getMaterials(),
        factoryApi.getProducts(),
        factoryApi.getStats(),
      ]);

      if (matRes.status === 'fulfilled' && matRes.value.data?.success) {
        setMaterials(matRes.value.data.data || []);
      }
      if (prodRes.status === 'fulfilled' && prodRes.value.data?.success) {
        setProducts(prodRes.value.data.data || []);
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
        setStats(statsRes.value.data.data);
      }
    } catch (err) {
      console.error('Erreur chargement données Usine:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRequestPickup = async (materialId) => {
    if (!window.confirm('Confirmez-vous la demande d\'enlèvement de cette matière auprès du centre ZTT ?')) return;
    setActionLoading(true);
    try {
      await factoryApi.requestPickup(materialId, { pickupDate: new Date() });
      alert('Demande d\'enlèvement transmise au centre ZTT avec succès !');
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la réservation de matière');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRecoverMaterial = async (materialId) => {
    setActionLoading(true);
    try {
      await factoryApi.recoverMaterial(materialId);
      alert('Matière réceptionnée et enregistrée dans le stock de votre usine !');
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la confirmation de récupération');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await factoryApi.createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        stock: parseInt(newProduct.stock, 10) || 0,
        currency: 'GNF',
      });
      setShowProductModal(false);
      setNewProduct({ name: '', category: 'meuble', price: '', stock: '', description: '' });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la création du produit');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Voulez-vous supprimer ce produit du catalogue ?')) return;
    try {
      await factoryApi.deleteProduct(productId);
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return (
    <DashboardLayout title="Espace Usine — Approvisionnement & Transformation">
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
                Matières Disponibles
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                {materials.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <Layers size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Lots prêts en centres ZTT
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Produits Fabriqués
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-info)', marginTop: '4px' }}>
                {products.length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-info-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-info)' }}>
              <Package size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Au catalogue marketplace
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Lots Récupérés
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
                {materials.filter(m => m.status === 'récupéré').length}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Transformés en nouveaux biens
          </div>
        </div>
      </div>

      {/* 2. Matières premières disponibles en ZTT */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.15rem' }}>Matières Premières Triées (Approvisionnement ZTT)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Consultez les stocks disponibles dans les centres de tri pour vos besoins industriels
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}><div className="spinner"></div></div>
        ) : materials.length > 0 ? (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Type de Matière</th>
                  <th>Quantité & Unité</th>
                  <th>Qualité du Tri</th>
                  <th>Statut</th>
                  <th>Action Approvisionnement</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((mat) => (
                  <tr key={mat._id}>
                    <td>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{mat.material}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{mat.description || 'Centre ZTT'}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                        {mat.quantity} {mat.unit || 'kg'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        mat.quality === 'excellente' ? 'badge-green' :
                        mat.quality === 'bonne' ? 'badge-blue' : 'badge-neutral'
                      }`}>
                        {mat.quality || 'Standard'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        mat.status === 'disponible' ? 'badge-green' :
                        mat.status === 'réservé' ? 'badge-amber' : 'badge-neutral'
                      }`}>
                        {mat.status}
                      </span>
                    </td>
                    <td>
                      {mat.status === 'disponible' && (
                        <button
                          onClick={() => handleRequestPickup(mat._id)}
                          disabled={actionLoading}
                          className="btn btn-sm btn-primary"
                        >
                          Demander Enlèvement
                        </button>
                      )}
                      {mat.status === 'réservé' && (
                        <button
                          onClick={() => handleRecoverMaterial(mat._id)}
                          disabled={actionLoading}
                          className="btn btn-sm btn-secondary"
                        >
                          Confirmer Réception
                        </button>
                      )}
                      {mat.status === 'récupéré' && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                          ✓ Récupéré
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--color-text-muted)' }}>
            Aucune matière première disponible en ZTT pour le moment.
          </div>
        )}
      </div>

      {/* 3. Gestion des Produits Recyclés Fabriqués */}
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>Catalogue de Produits Issus du Recyclage</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Produits manufacturés par votre usine et publiés sur la plateforme CoVaDeS
            </p>
          </div>
          <button onClick={() => setShowProductModal(true)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Nouveau Produit</span>
          </button>
        </div>

        {/* Modal Ajout Produit */}
        {showProductModal && (
          <div style={{
            backgroundColor: 'var(--color-primary-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginBottom: '14px' }}>Ajouter un produit fabriqué à partir de matières recyclées</h4>
            <form onSubmit={handleCreateProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Nom du produit</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="Ex: Pavé en plastique recyclé"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select 
                    className="form-control"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="meuble">Meuble & Aménagement</option>
                    <option value="décoration">Décoration & Maison</option>
                    <option value="outil">Outil & Construction</option>
                    <option value="accessoire">Accessoire & Rangement</option>
                    <option value="autre">Autre filière</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Prix unitaire (GNF)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    placeholder="50000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock disponible</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    placeholder="100"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description & Procédé de valorisation</label>
                <textarea 
                  className="form-control" 
                  rows="2"
                  placeholder="Décrivez les matériaux utilisés (ex: polyéthylène haute densité issu des emballages)..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-outline btn-sm">
                  Annuler
                </button>
                <button type="submit" disabled={actionLoading} className="btn btn-primary btn-sm">
                  Enregistrer et publier
                </button>
              </div>
            </form>
          </div>
        )}

        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {products.map((p) => (
              <div key={p._id} style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{p.name}</h4>
                    <span className="badge badge-green">{p.category}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '8px 0' }}>
                    {p.description || 'Produit issu de l\'économie circulaire locale.'}
                  </p>
                </div>
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--color-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                      {p.price?.toLocaleString()} GNF
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Stock : {p.stock || 0} unités
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteProduct(p._id)} 
                    className="btn btn-outline btn-sm"
                    style={{ color: 'var(--color-danger)', padding: '6px' }}
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '24px 0' }}>
            Aucun produit recyclé encore créé. Cliquez sur « Nouveau Produit » pour publier sur la marketplace.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsineDashboardPage;
