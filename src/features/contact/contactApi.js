import { mainApi } from "../../app/mainApi";

const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create Contact (User)
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ["contact"]
    }),

    // ✅ Get All Contacts (Admin)
    getContacts: builder.query({
      query: (token) => ({
        url: "/contacts",
        method: "GET",
        headers: {
          Authorization: token
        }
      }),
      providesTags: ["contact"]
    }),

    // ✅ Reply Contact (Admin)
    replyContact: builder.mutation({
      query: ({ id, reply, token }) => ({
        url: `/contacts/${id}/reply`,
        method: "PATCH",
        headers: {
          Authorization: token
        },
        body: { reply }
      }),
      invalidatesTags: ["contact"]
    }),

    // ✅ Delete Contact (Admin)
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token
        }
      }),
      invalidatesTags: ["contact"]
    })

  })
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useReplyContactMutation,
  useDeleteContactMutation
} = contactApi;
