import API from './axiosInstance';

export const apiService = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const response = await API.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: object): Promise<T> => {
    const response = await API.post<T>(url, data);
    return response.data;
  },
};
