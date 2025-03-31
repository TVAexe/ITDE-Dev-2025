import apiSlice from "./api";

const trainingPointsService = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTrainingPoints: builder.query<any, { studentId: string, semesterId: string }>({
            query: ({ studentId, semesterId }) => ({
                url: `/api/training-points?studentId=${studentId}&semesterId=${semesterId}`,
                method: "GET",  
            }),
        }),
    }),
});

export const { useGetTrainingPointsQuery } = trainingPointsService;
export default trainingPointsService;
