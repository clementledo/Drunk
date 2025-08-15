// Couleurs principales de l'application
export const COLORS = {
  // Couleurs primaires
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Couleurs de statut
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#5AC8FA',
  
  // Couleurs de texte
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  textInverse: '#FFFFFF',
  
  // Couleurs de fond
  background: '#F2F2F7',
  backgroundSecondary: '#FFFFFF',
  backgroundTertiary: '#F8F8F8',
  
  // Couleurs de bordure
  border: '#E5E5EA',
  borderLight: '#F2F2F7',
  borderDark: '#D1D1D6',
  
  // Couleurs système
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Tailles de police
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  title: 32,
};

// Poids de police
export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Espacements
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

// Rayons de bordure
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
};

// Dimensions
export const DIMENSIONS = {
  // Tailles de boutons
  buttonHeight: {
    small: 32,
    medium: 44,
    large: 52,
  },
  
  // Tailles d'input
  inputHeight: 44,
  
  // Tailles d'icônes
  iconSize: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
  },
  
  // Tailles d'avatar
  avatarSize: {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 80,
  },
};

// Ombres
export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Animations
export const ANIMATIONS = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};
