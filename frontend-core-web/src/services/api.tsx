import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: async (headers) => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        
        return headers;
      } catch (error) {
        console.error('Error preparing headers:', error);
        return headers;
      }
    },
  }),

  endpoints: builder => ({}),
})

export default apiSlice;
