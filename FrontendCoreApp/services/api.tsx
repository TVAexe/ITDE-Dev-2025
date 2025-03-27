import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers, { getState }) => {
      try {
        const state = getState() as RootState;
        const token = state.user.token;

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
  tagTypes: ['User', 'Review', 'Details', 'Order', 'Product', 'Category', 'Slider', 'Banner'],
  endpoints: builder => ({}),
})

export default apiSlice
