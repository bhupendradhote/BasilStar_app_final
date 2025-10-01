// app/services/_api.ts (unchanged, as it's now connecting successfully to https://basilstar.com/api)

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Keep as is, since it's working with the public URL
const API_URL = 'https://basilstar.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for detailed error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Detailed API Error:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response ? error.response.data : null,
    });
    return Promise.reject(error);
  }
);

export default api;
