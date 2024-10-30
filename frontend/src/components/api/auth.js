// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:9004/api/auth';

export const login = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};