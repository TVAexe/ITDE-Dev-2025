import apiSlice from './api';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { studentId: string; password: string }>({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUserInfo: builder.query({
      query: () => '/api/auth/user',
      providesTags: ['User'],
    }),

    createUser: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUsers: builder.query({
      query: ({ page }) => `/api/user?page=${page}`,
      providesTags: (result) =>
        result
          ? [...result.data.users.map(({ _id }) => ({ type: 'User', id: _id })), 'User']
          : ['User'],
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'User', id: arg.body._id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApiSlice;
