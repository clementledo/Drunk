import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration de base d'Axios
const API_BASE_URL = 'https://your-api-endpoint.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Intercepteur de réponse pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Gestion du token expiré (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const {token} = response.data;
          await AsyncStorage.setItem('authToken', token);

          // Retry la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token invalide, redirection vers login
        await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
        // Ici vous pouvez dispatcher une action pour déconnecter l'utilisateur
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
