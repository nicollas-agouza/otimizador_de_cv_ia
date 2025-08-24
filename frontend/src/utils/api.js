import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Token expirado ou inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirecionar para login apenas se não estiver já na página de auth
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/login';
      }
    }
    
    // Erro de rede
    if (!error.response) {
      error.response = {
        data: {
          detail: 'Erro de conexão. Verifique sua internet.'
        }
      };
    }
    
    return Promise.reject(error);
  }
);

// Funções específicas da API
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  forgotPassword: (email) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, password) => 
    api.post('/auth/reset-password', { token, password }),
  
  getMe: () => 
    api.get('/auth/me'),
  
  refreshToken: () => 
    api.post('/auth/refresh'),
  
  logout: () => 
    api.post('/auth/logout')
};

export const cvAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/cv/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  optimize: (cvId, jobDescription) => 
    api.post(`/cv/${cvId}/optimize`, { job_description: jobDescription }),
  
  getAll: () => 
    api.get('/cv'),
  
  getById: (id) => 
    api.get(`/cv/${id}`),
  
  delete: (id) => 
    api.delete(`/cv/${id}`)
};