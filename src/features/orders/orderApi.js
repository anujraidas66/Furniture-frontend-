// import { mainApi } from "../../app/mainApi";


// const orderApi = mainApi.injectEndpoints({
//     endpoints: (builder) => ({
//          getOrder: builder.query({
//             query: (token) => ({
//                 url: '/orders',
//                 method: 'GET',
//                 headers: {
//                     Authorization: token
//                 }
//             }),
//             providesTags: ['order']
//         }),

//         createOrder: builder.mutation({
//             query: (data) => ({
//                 url: '/orders',
//                 method:'POST',
//                 headers: {
//                     Authorization: data.token
//                 },

//                 body: data.body
//             }),
//             invalidatesTags: ['order']
//         }),

//        updateOrderStatus: builder.mutation({
//   query: ({ orderId, status, token }) => ({
//     url: `/orders/${orderId}/status`,
//     method: "PATCH",
//     headers: {
//       Authorization: token
//     },
//     body: { status }
//   }),
//   invalidatesTags: ["order"]
// }),
//     })
// })


// export const {useGetOrderQuery,useCreateOrderMutation, userUpdateOrderStatusMutation} = orderApi;


import { mainApi } from "../../app/mainApi";

const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ALL ORDERS
    getOrder: builder.query({
      query: (token) => ({
        url: "/orders",
        method: "GET",
        headers: {
          Authorization: token
        }
      }),
      providesTags: ["order"]
    }),

    // ✅ CREATE ORDER
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ["order"]
    }),

    // ✅ UPDATE ORDER STATUS (ADMIN)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, token }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        headers: {
          Authorization: token
        },
        body: { status }
      }),
      invalidatesTags: ["order"]
    }),

    cancelOrder: builder.mutation({
  query: ({ orderId, token }) => ({
    url: `/orders/${orderId}/cancel`,
    method: "PATCH",
    headers: { Authorization: token },
  }),
  invalidatesTags: ["order"]
}),


  })
});

// ✅ CORRECT EXPORTS
export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation
} = orderApi;
