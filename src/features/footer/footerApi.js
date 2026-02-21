import { mainApi } from "../../app/mainApi";
import { getUserFromLocal } from "../local/local";

export const subscribeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscribe: builder.mutation({
      query: (email) => {
        const user = getUserFromLocal(); // get user from localStorage
        return {
          url: "/subscribe",
          method: "POST",
          body: { email },
          headers: {
            Authorization: user?.token ? user.token : "",
          },
        };
      },
    }),


    
    getSubscribers: builder.query({
      query: () => {
        const user = getUserFromLocal();
        return {
          url: "/subscribe",
          headers: {
            Authorization: user?.token ? user.token : "",
          },
        };
      },
    }),


    
  }),
});


export const {
  useCreateSubscribeMutation,
  useGetSubscribersQuery,
} = subscribeApi;
