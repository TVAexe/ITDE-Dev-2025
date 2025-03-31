import apiSlice from "./api";

const eventsService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, void>({
            query: () => `/api/events`,
        }),
        getRegisteredEvents: builder.query<any, string>({
            query: (studentId: string) => `/api/events?studentId=${studentId}`,
        }),
        getEventById: builder.query<any, string>({
            query: (id: string) => `/api/events/${id}`,
        }),
        registerEvent: builder.mutation<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/api/events/register`,
                    method: "POST",
                    body: {
                        studentId: studentId,
                        eventId: eventId,
                    },
                };
            },
        }),
        checkinEvent: builder.mutation<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/api/events/checkin`,
                    method: "PUT",
                    body: {
                        studentId: studentId,
                        eventId: eventId,
                    },
                };
            },
        }), 
        getCheckinCount: builder.query<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/api/checkincnt?studentId=${studentId}&eventId=${eventId}`,
                };
            },
        }),
    }),
});

export const { useGetEventsQuery, useGetRegisteredEventsQuery, useGetEventByIdQuery, useRegisterEventMutation, useCheckinEventMutation, useGetCheckinCountQuery } = eventsService;
