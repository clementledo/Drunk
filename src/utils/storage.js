import AsyncStorage from '@react-native-async-storage/async-storage';

// Clés de stockage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  PREFERENCES: 'userPreferences',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  CACHE_DATA: 'cacheData',
};

// Service de stockage local
export const StorageService = {
  // Sauvegarder une valeur
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  },

  // Récupérer une valeur
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      return null;
    }
  },

  // Supprimer une valeur
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  },

  // Supprimer plusieurs valeurs
  removeItems: async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression multiple:', error);
      return false;
    }
  },

  // Vider tout le stockage
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Erreur lors du vidage:', error);
      return false;
    }
  },

  // Obtenir toutes les clés
  getAllKeys: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error('Erreur lors de la récupération des clés:', error);
      return [];
    }
  },
};
