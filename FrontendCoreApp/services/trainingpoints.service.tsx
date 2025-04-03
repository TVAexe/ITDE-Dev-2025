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
        getTraingingPointsForm: builder.query<any, void>({
            query: () => ({
                url: `/api/training-points/form`,
                method: "GET",  
            }),
        }),
        submitTrainingPoints: builder.mutation<any, { studentId: string, semesterId: string, score: number }>({
            query: ({ studentId, semesterId, score }) => ({
                url: `/api/training-points/submit`,
                method: "POST",
                body: { studentId, semesterId, score },
            }),
        }),
    }),
});

export const { useGetTrainingPointsQuery, useGetTraingingPointsFormQuery, useSubmitTrainingPointsMutation } = trainingPointsService;
export default trainingPointsService;
