import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: async (headers) => {
      try {
        const token = localStorage.getItem('accessToken') || "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZXd1c2VyIiwiY2hpbmgubGg1NCI6eyJwcmluY2lwYWwiOnsicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lIjoibmV3dXNlciIsImF1dGhvcml0aWVzIjpbeyJyb2xlIjoiUk9MRV9VU0VSIn1dLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiYWNjb3VudE5vbkxvY2tlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlfSwiY3JlZGVudGlhbHMiOm51bGwsImF1dGhvcml0aWVzIjpbeyJyb2xlIjoiUk9MRV9VU0VSIn1dLCJkZXRhaWxzIjpudWxsLCJhdXRoZW50aWNhdGVkIjp0cnVlfSwiZXhwIjoxMDM4MzY4MjUxNSwiaWF0IjoxNzQzNjgyNTE1fQ.1JVq1VbsbMDDGMJ4hBI4xFQiNSuvmG76BNliSJl52zj7a26asxGC_BC94hAibWAlXp949cRkqUm2tPLzRnlElA";
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
