import { mainApi } from "../../app/mainApi";

const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["Product"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getRelatedProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}/related`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        headers: {
          Authorization: data.token,
        },
        body: data.body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PATCH",
        body: data.body,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    removeProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `/products/category/${category}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),


    addReview: builder.mutation({
      query: ({ productId, rating, comment, token }) => ({
        url: `/products/reviews/${productId}`,
        method: "POST",
        body: { rating, comment },
        headers: { Authorization:  token },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review", id: productId },
      ],
    }),

    // Get Reviews
    getReviews: builder.query({
      query: (productId) => ({
        url: `/products/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),
  })
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useGetProductsByCategoryQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
  useGetRelatedProductsQuery,
  useAddReviewMutation,
  useGetReviewsQuery
} = productApi;
