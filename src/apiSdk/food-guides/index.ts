import axios from 'axios';
import queryString from 'query-string';
import { FoodGuideInterface } from 'interfaces/food-guide';
import { GetQueryInterface } from '../../interfaces';

export const getFoodGuides = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/food-guides${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFoodGuide = async (foodGuide: FoodGuideInterface) => {
  const response = await axios.post('/api/food-guides', foodGuide);
  return response.data;
};

export const updateFoodGuideById = async (id: string, foodGuide: FoodGuideInterface) => {
  const response = await axios.put(`/api/food-guides/${id}`, foodGuide);
  return response.data;
};

export const getFoodGuideById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/food-guides/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFoodGuideById = async (id: string) => {
  const response = await axios.delete(`/api/food-guides/${id}`);
  return response.data;
};
