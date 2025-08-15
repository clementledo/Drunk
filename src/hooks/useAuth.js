import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {authService} from '../services/api/authService';
import {loginStart, loginSuccess, loginFailure, logout} from '../store/slices/authSlice';

// Hook personnalisé pour l'authentification
export const useAuth = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user, loading, error} = useSelector(state => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      const response = await authService.login(email, password);
      dispatch(loginSuccess({
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      }));
      return {success: true};
    } catch (error) {
      dispatch(loginFailure(error.message));
      return {success: false, error: error.message};
    }
  };

  const register = async (userData) => {
    dispatch(loginStart());
    try {
      const response = await authService.register(userData);
      dispatch(loginSuccess({
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      }));
      return {success: true};
    } catch (error) {
      dispatch(loginFailure(error.message));
      return {success: false, error: error.message};
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};
