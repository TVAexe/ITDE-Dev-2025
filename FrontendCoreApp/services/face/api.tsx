import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:8000',
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem('token');
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
  endpoints: builder => ({
    getFace: builder.mutation<any, {studentId: string, eventId: string, file: string}>({
      query: ({studentId, eventId, file}) => ({
        url: '/detect-face',
        method: 'POST',
        body: {studentId, eventId, file},
      }),
    }),
  }),
})

export default apiSlice;
