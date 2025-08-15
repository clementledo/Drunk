import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  networkStatus: 'connected',
  currentScreen: 'Home',
  modalVisible: false,
  modalContent: null,
  toastMessage: null,
  appVersion: '1.0.0',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNetworkStatus: (state, action) => {
      state.networkStatus = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    showModal: (state, action) => {
      state.modalVisible = true;
      state.modalContent = action.payload;
    },
    hideModal: state => {
      state.modalVisible = false;
      state.modalContent = null;
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    hideToast: state => {
      state.toastMessage = null;
    },
  },
});

export const {
  setLoading,
  setNetworkStatus,
  setCurrentScreen,
  showModal,
  hideModal,
  showToast,
  hideToast,
} = appSlice.actions;

export default appSlice.reducer;
