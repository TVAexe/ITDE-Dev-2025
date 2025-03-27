import apiSlice from "./api";

const eventsService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, void>({
            query: () => `/events`,
        }),
    }),
});

export const { useGetEventsQuery } = eventsService;
