import apiSlice from "./api";

const faceService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkinEvent: builder.mutation<any, {studentId: string, eventId: string, image: string}>({
            query: ({studentId, eventId, image}) => {
                const formData = new FormData();
                formData.append('studentId', studentId);
                formData.append('eventId', eventId);
                formData.append('image', image);
                return {
                    url: `/events/checkin`,
                    method: "PUT",
                    body: formData,
                };
            },
        }), 
        checkoutEvent: builder.mutation<any, {studentId: string, eventId: string, image: string}>({
            query: ({studentId, eventId, image}) => {
                const formData = new FormData();
                formData.append('studentId', studentId);
                formData.append('eventId', eventId);
                formData.append('image', image);
                return {
                    url: `/events/checkout`,
                    method: "PUT",
                    body: formData,
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const { useCheckinEventMutation, useCheckoutEventMutation } = faceService;
