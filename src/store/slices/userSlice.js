import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {
    theme: 'light',
    language: 'fr',
    notifications: true,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.profile = {...state.profile, ...action.payload};
    },
    setPreferences: (state, action) => {
      state.preferences = {...state.preferences, ...action.payload};
    },
    setTheme: (state, action) => {
      state.preferences.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.preferences.language = action.payload;
    },
    toggleNotifications: state => {
      state.preferences.notifications = !state.preferences.notifications;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setUserProfile,
  updateUserProfile,
  setPreferences,
  setTheme,
  setLanguage,
  toggleNotifications,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
