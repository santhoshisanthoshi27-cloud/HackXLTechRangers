import { api } from './api';

export const adminService = {
  getOverview: async () => {
    const response = await api.get('/admin/overview');
    return response.data;
  },
  
  getUsers: async (params?: { skip?: number; limit?: number; search?: string; role?: string }) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  
  getCampaigns: async (params?: { skip?: number; limit?: number; status?: string }) => {
    const response = await api.get('/admin/campaigns', { params });
    return response.data;
  },
  
  getHealth: async () => {
    const response = await api.get('/admin/health');
    return response.data;
  }
};
