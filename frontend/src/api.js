import axios from 'axios';

// Base URL for API endpoints
const API_URL = 'http://localhost:5000/users';

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const createUser = async (user) => {
  return await axios.post(API_URL, user);
};

export const updateUser = async (id, user) => {
  return await axios.patch(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getAverageAge = async () => {
  try {
    const response = await axios.get(`${API_URL}/average-age`);
    return response.data;
  } catch (error) {
    console.error('Error fetching average age:', error);
    throw error;
  }
};