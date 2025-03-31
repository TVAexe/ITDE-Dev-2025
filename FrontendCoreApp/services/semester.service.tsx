import apiSlice from "./api";

const semesterService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSemester: builder.query<any, void>({
            query: () => `/api/semester`,
        }),
        getSemesterByStudentId: builder.query<any, string>({
            query: (studentId) => `/api/semester?studentId=${studentId}`,
        }),
    }),
});

export const { useGetSemesterQuery, useGetSemesterByStudentIdQuery } = semesterService;
