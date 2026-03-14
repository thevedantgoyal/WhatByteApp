import { useState, useCallback } from 'react';
import {
  signInUser,
  registerUser,
  signOutUser,
} from '../services/authService';

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = useCallback(() => setError(''), []);

  async function login(email, password) {
    setLoading(true);
    setError('');
    const result = await signInUser(email, password);
    setLoading(false);
    if (result.success) {
      return { success: true, user: result.user };
    }
    setError(result.error);
    return { success: false };
  }

  async function register(email, password) {
    setLoading(true);
    setError('');
    const result = await registerUser(email, password);
    setLoading(false);
    if (result.success) {
      return { success: true, user: result.user };
    }
    setError(result.error);
    return { success: false };
  }

  async function logout() {
    setLoading(true);
    setError('');
    const result = await signOutUser();
    setLoading(false);
    if (result.success) {
      return { success: true };
    }
    setError(result.error);
    return { success: false };
  }

  return { login, register, logout, loading, error, clearError };
}

export default useAuth;
