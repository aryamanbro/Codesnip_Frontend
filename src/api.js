import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000';


const apiClient = axios.create({
  baseURL: API_URL,
});


apiClient.interceptors.request.use(
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

export const login = (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email); 
  formData.append('password', password);

  return apiClient.post('/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

export const register = (email, password) => {
  return apiClient.post('/users/', { email, password });
};

export const getCurrentUser = () => {
  return apiClient.get('/users/me');
};


export const getSnippets = () => {
  return apiClient.get('/snippets/');
};

export const createSnippet = (snippetData) => {
  return apiClient.post('/snippets/', snippetData);
};

export const updateSnippet = (id, snippetData) => {
  return apiClient.put(`/snippets/${id}`, snippetData);
};

export const deleteSnippet = (id) => {
  return apiClient.delete(`/snippets/${id}`);
};

export default apiClient;