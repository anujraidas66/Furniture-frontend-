import { mainApi } from "../../app/mainApi";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      })
    }),

    userRegister:builder.mutation({
      query: (data) => ({
        url:'users/register',
        method:'POST',
        body:data
      })
    })
  })
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
