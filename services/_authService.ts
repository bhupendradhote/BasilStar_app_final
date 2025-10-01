// app/services/_authService.ts (unchanged, already using single "name" field)

import api from './_api';

interface RegisterData {
  name: string; // Single name field to match server expectation
  email: string;
  phone: string;
  password: string;
  password_confirmation?: string; // Add if server requires confirmation
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
