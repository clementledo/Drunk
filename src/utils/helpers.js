import {Dimensions, Platform} from 'react-native';

// Dimensions de l'écran
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Fonctions utilitaires pour les dimensions
export const ScreenUtils = {
  // Dimensions de l'écran
  width: screenWidth,
  height: screenHeight,
  
  // Fonctions de mise à l'échelle
  scale: (size) => (screenWidth / 375) * size, // Basé sur iPhone X
  verticalScale: (size) => (screenHeight / 812) * size,
  moderateScale: (size, factor = 0.5) => size + (ScreenUtils.scale(size) - size) * factor,
  
  // Vérifications de plateforme
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  
  // Vérifications de taille d'écran
  isSmallScreen: screenWidth < 375,
  isMediumScreen: screenWidth >= 375 && screenWidth < 414,
  isLargeScreen: screenWidth >= 414,
  
  // Hauteurs spécifiques iOS
  getStatusBarHeight: () => {
    if (Platform.OS === 'ios') {
      return screenHeight >= 812 ? 44 : 20; // iPhone X+ : iPhone ancien
    }
    return 0;
  },
  
  getBottomTabsHeight: () => {
    if (Platform.OS === 'ios') {
      return screenHeight >= 812 ? 83 : 49; // iPhone X+ : iPhone ancien
    }
    return 56; // Android
  },
};

// Fonctions utilitaires pour les chaînes de caractères
export const StringUtils = {
  // Capitaliser la première lettre
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  // Capitaliser chaque mot
  capitalizeWords: (str) => {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },
  
  // Tronquer le texte
  truncate: (str, length = 50) => {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  },
  
  // Valider l'email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Valider le mot de passe (au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre)
  validatePassword: (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
  },
  
  // Générer un ID aléatoire
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },
};

// Fonctions utilitaires pour les dates
export const DateUtils = {
  // Formater une date
  formatDate: (date, format = 'DD/MM/YYYY') => {
    if (!date) return '';
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return d.toLocaleDateString();
    }
  },
  
  // Formater l'heure
  formatTime: (date, format24h = true) => {
    if (!date) return '';
    
    const d = new Date(date);
    if (format24h) {
      return d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  },
  
  // Obtenir le temps relatif
  getRelativeTime: (date) => {
    if (!date) return '';
    
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    
    return DateUtils.formatDate(date);
  },
  
  // Vérifier si c'est aujourd'hui
  isToday: (date) => {
    if (!date) return false;
    const today = new Date();
    const checkDate = new Date(date);
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  },
};

// Fonctions utilitaires pour les nombres
export const NumberUtils = {
  // Formater un nombre avec des séparateurs
  formatNumber: (num, locale = 'fr-FR') => {
    if (num == null) return '0';
    return new Intl.NumberFormat(locale).format(num);
  },
  
  // Formater une devise
  formatCurrency: (amount, currency = 'EUR', locale = 'fr-FR') => {
    if (amount == null) return '0 €';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },
  
  // Formater un pourcentage
  formatPercentage: (value, decimals = 0) => {
    if (value == null) return '0%';
    return `${(value * 100).toFixed(decimals)}%`;
  },
  
  // Générer un nombre aléatoire
  randomBetween: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

// Fonction de debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Fonction de throttle
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
