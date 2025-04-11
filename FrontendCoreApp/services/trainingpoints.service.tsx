import apiSlice from "./api";

const trainingPointsService = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getTrainingPoints: builder.query<any, { studentId: string, semesterId: string }>({
            query: ({ studentId, semesterId }) => ({
                url: `/score?studentId=${studentId}&semester=${semesterId}`,
                method: "GET",  
            }),
        }),
        getTraingingPointsForm: builder.query<any, void>({
            query: () => ({
                url: `/form/current`,
                method: "GET",  
            }),
        }),
        submitTrainingPoints: builder.mutation<any, { studentId: string, semesterId: string, score: number }>({
            query: ({ studentId, semesterId, score }) => ({
                url: `/score?studentId=${studentId}&semester=${semesterId}`,
                method: "POST",
                body: { self_score : score },
            }),
        }),
    }),
});

export const { useGetTrainingPointsQuery, useGetTraingingPointsFormQuery, useSubmitTrainingPointsMutation } = trainingPointsService;
export default trainingPointsService;
