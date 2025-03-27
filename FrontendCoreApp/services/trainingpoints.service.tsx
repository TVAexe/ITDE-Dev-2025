import apiSlice from "./api";

const trainingPointsService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingPoints: builder.query<any, { studentId: string }>({
            query: ({ studentId }) => `/training-points/${studentId}`,
        }),
    }),
});

export const { useGetTrainingPointsQuery } = trainingPointsService;
