import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const base = 'http://10.105.19.37:5000';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.105.19.37:5000/api' }),
  endpoints: (builder) => ({}), // ✅ must be lowercase
});
