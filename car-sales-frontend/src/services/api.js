import axios from 'axios';

// Base URLs for Spring Boot Backend & Python AI Service
const SPRING_BOOT_BASE = 'http://localhost:8080/api';
const PYTHON_AI_BASE = 'http://localhost:5000/api';

// --- SPRING BOOT ANALYTICS & CAR API SERVICES ---

export const getDashboardSummary = async () => {
  const response = await axios.get(`${SPRING_BOOT_BASE}/analytics/summary`);
  return response.data;
};

export const getFuelDistribution = async () => {
  const response = await axios.get(`${SPRING_BOOT_BASE}/analytics/fuel-distribution`);
  return response.data;
};

export const getBrandSales = async () => {
  const response = await axios.get(`${SPRING_BOOT_BASE}/analytics/brand-sales`);
  return response.data;
};

export const getAllCars = async () => {
  const response = await axios.get(`${SPRING_BOOT_BASE}/cars`);
  return response.data;
};

export const searchCars = async (params) => {
  const response = await axios.get(`${SPRING_BOOT_BASE}/cars/search`, { params });
  return response.data;
};

// --- PYTHON FASTAPI RECOMMENDATION AI SERVICE ---

export const getAIRecommendations = async (preferences) => {
  const response = await axios.post(`${PYTHON_AI_BASE}/recommend`, preferences);
  return response.data;
};