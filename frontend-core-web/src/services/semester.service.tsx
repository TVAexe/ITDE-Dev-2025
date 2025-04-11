import apiSlice from "./api";

const semesterService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSemester: builder.query<any, void>({
            query: () => `/semester/allSemester`,
        }),
        getSemesterByStudentId: builder.query({
            query: ({studentId}) => `/semester/by-student-id/${studentId}`,
        }),
    }),
});

export const { useGetSemesterQuery, useGetSemesterByStudentIdQuery } = semesterService;
