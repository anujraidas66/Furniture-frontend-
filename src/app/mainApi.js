import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const base = 'https://furniture-backend-f12u.onrender.com';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://furniture-backend-f12u.onrender.com/api' }),
  endpoints: (builder) => ({}), 
});
