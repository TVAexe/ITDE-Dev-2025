import apiSlice from "./api";

const eventsService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, void>({
            query: () => `/eventDetails/ongoing`,
        }),
        getRegisteredEvents: builder.query({
            query: ({studentId}) => `/events/registered?studentId=${studentId}`,
        }),
        getEventById: builder.query({
            query: ({eventId}) => `/eventDetails/${eventId}`,
        }),
        registerEvent: builder.mutation<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/events/register`,
                    method: "POST",
                    body: {
                        studentId: studentId,
                        eventId: eventId,
                    },
                };
            },
        }),
        checkinEvent: builder.mutation<any, {studentId: string, eventId: string, image: string}>({
            query: ({studentId, eventId, image}) => {
                return {
                    url: `/events/checkin`,
                    method: "PUT",
                    body: {
                        studentId: studentId,
                        eventId: eventId,
                        time: new Date().toISOString(),
                        image: image
                    },
                };
            },
        }), 
        checkoutEvent: builder.mutation<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/events/checkout`,
                    method: "PUT",
                    body: {
                        studentId: studentId,
                        eventId: eventId,
                        time: new Date().toISOString()
                    },
                };
            },
        }),
        getCheckinCount: builder.query<any, {studentId: string, eventId: string}>({
            query: ({studentId, eventId}) => {
                return {
                    url: `/checkincnt?studentId=${studentId}&eventId=${eventId}`,
                };
            },
        }),

    }),
    overrideExisting: true,
});

export const { useGetEventsQuery, useGetRegisteredEventsQuery, useGetEventByIdQuery, useRegisterEventMutation, useCheckinEventMutation, useGetCheckinCountQuery, useCheckoutEventMutation } = eventsService;
