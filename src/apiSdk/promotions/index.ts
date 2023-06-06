import axios from 'axios';
import queryString from 'query-string';
import { PromotionInterface } from 'interfaces/promotion';
import { GetQueryInterface } from '../../interfaces';

export const getPromotions = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/promotions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPromotion = async (promotion: PromotionInterface) => {
  const response = await axios.post('/api/promotions', promotion);
  return response.data;
};

export const updatePromotionById = async (id: string, promotion: PromotionInterface) => {
  const response = await axios.put(`/api/promotions/${id}`, promotion);
  return response.data;
};

export const getPromotionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/promotions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePromotionById = async (id: string) => {
  const response = await axios.delete(`/api/promotions/${id}`);
  return response.data;
};
