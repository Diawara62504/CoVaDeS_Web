import axios from 'axios';

// URL de base de l'API : prend la variable d'environnement ou bascule sur localhost:5000 par défaut
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 75000, // 75s pour supporter le réveil éventuel (cold start) de Render
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour injecter automatiquement le token JWT s'il existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('covades_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour traiter les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si non autorisé ou token expiré sur une route protégée
      const isAuthRoute = error.config.url.includes('/api/auth/login');
      if (!isAuthRoute) {
        localStorage.removeItem('covades_token');
        localStorage.removeItem('covades_user');
        if (window.location.pathname.startsWith('/pme') ||
            window.location.pathname.startsWith('/usine') ||
            window.location.pathname.startsWith('/mairie') ||
            window.location.pathname.startsWith('/ztt') ||
            window.location.pathname.startsWith('/admin')) {
          window.location.href = '/login?expired=1';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ==========================================
// 1. API AUTHENTIFICATION
// ==========================================
export const authApi = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getMe: () => api.get('/api/auth/me'),
  updateProfile: (profileData) => api.put('/api/auth/profile', profileData),
  changePassword: (data) => api.put('/api/auth/change-password', data),
};

// ==========================================
// 2. API PUBLIQUE & CATALOGUE
// ==========================================
export const publicApi = {
  getProducts: (params) => api.get('/api/products', { params }),
  getProductById: (id) => api.get(`/api/products/${id}`),
  getCategories: () => api.get('/api/products/categories'),
  getHealth: () => api.get('/api/health'),
};

// ==========================================
// 3. API ESPACE PME (Collecte & Valorisation)
// ==========================================
export const pmeApi = {
  getDashboard: () => api.get('/api/pme/dashboard'),
  getStats: () => api.get('/api/pme/stats'),
  getClients: () => api.get('/api/pme/clients'),
  getCollectors: () => api.get('/api/pme/collectors'),
  addCollector: (data) => api.post('/api/pme/collectors', data),
  getReports: (params) => api.get('/api/reports/pme', { params }),
  updateReportStatus: (id, status, notes) => api.put(`/api/reports/${id}/status`, { status, notes }),
  assignCollector: (id, collectorId) => api.put(`/api/reports/${id}/assign-collector`, { collectorId }),
};

// ==========================================
// 4. API ESPACE USINE (Transformation & Recyclage)
// ==========================================
export const factoryApi = {
  getMaterials: (params) => api.get('/api/factory/materials', { params }),
  requestPickup: (materialId, data) => api.post(`/api/factory/materials/${materialId}/request-pickup`, data),
  recoverMaterial: (materialId) => api.put(`/api/factory/materials/${materialId}/recover`),
  getProducts: (params) => api.get('/api/factory/products', { params }),
  createProduct: (productData) => api.post('/api/factory/products', productData),
  updateProduct: (id, productData) => api.put(`/api/factory/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/api/factory/products/${id}`),
  getStats: () => api.get('/api/factory/stats'),
};

// ==========================================
// 5. API ESPACE MAIRIE (Supervision Territoriale)
// ==========================================
export const mairieApi = {
  getStats: () => api.get('/api/mairie/stats'),
  getReports: (params) => api.get('/api/mairie/reports', { params }),
  getMapData: () => api.get('/api/mairie/map'),
  getPmes: () => api.get('/api/mairie/pmes'),
  validatePme: (id, data) => api.put(`/api/mairie/pmes/${id}/validate`, data),
  assignZoneToPme: (id, zoneId) => api.put(`/api/mairie/pmes/${id}/zone`, { zoneId }),
  getZtts: () => api.get('/api/mairie/ztts'),
  validateZtt: (id, data) => api.put(`/api/mairie/ztts/${id}/validate`, data),
  getUncoveredZones: () => api.get('/api/mairie/uncovered-zones'),
};

// ==========================================
// 6. API ESPACE ZTT (Zone de Tri & Transit)
// ==========================================
export const zttApi = {
  getEntries: (params) => api.get('/api/ztt/entries', { params }),
  createEntry: (entryData) => api.post('/api/ztt/entries', entryData),
  completeSorting: (id, sortingData) => api.put(`/api/ztt/entries/${id}/complete-sorting`, sortingData),
  getMaterials: () => api.get('/api/ztt/materials'),
  getStats: () => api.get('/api/ztt/stats'),
};

// ==========================================
// 7. API ADMINISTRATION (Supervision Système)
// ==========================================
export const adminApi = {
  getStats: () => api.get('/api/admin/stats'),
  getAllUsers: (params) => api.get('/api/admin/users', { params }),
  getUser: (id) => api.get(`/api/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/api/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getAllZones: () => api.get('/api/admin/zones'),
  createZone: (data) => api.post('/api/admin/zones', data),
  updateZone: (id, data) => api.put(`/api/admin/zones/${id}`, data),
  deleteZone: (id) => api.delete(`/api/admin/zones/${id}`),
  assignPMEToZone: (id, pmeId) => api.put(`/api/admin/zones/${id}/assign-pme`, { pmeId }),
  getAllCategories: () => api.get('/api/admin/categories'),
  createCategory: (data) => api.post('/api/admin/categories', data),
};

export default api;
