import AsyncStorage from '@react-native-async-storage/async-storage';
import apiSlice from './api';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { studentId: string; password: string }>({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem('token', data.token);
          const userInfo = {
            id: data.userInfo.id,
            name: data.userInfo.name,
            gender: data.userInfo.gender,
            address: data.userInfo.address,
            birth_date: data.userInfo.birth_date,
            class_id: data.userInfo.class_id,
            email: data.userInfo.email,
            image: data.userInfo.image,
            position: data.userInfo.position
          };
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
          console.error('Error saving token:', error);
        }
      },
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
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
    }),

    getUsers: builder.query({
      query: ({ page }) => `/api/user?page=${page}`,
      providesTags: (result) =>
        result
          ? [...result.data.users.map(({ _id }: { _id: string }) => ({ type: 'User', id: _id })), 'User']
          : ['User'],
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
    }),

    registFace: builder.mutation({
      query: ({ studentId, video }) => {
        const formData = new FormData();
        formData.append("id", studentId);
        formData.append("video", {
          uri: video.uri,
          name: "video.mp4",
          type: "video/mp4",
        } as any);
        return {
          url: `/regist-face`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["User"],
    }),
    

  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useLogoutMutation,
  useRegistFaceMutation,
} = userApiSlice;
