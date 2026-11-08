import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URI = 'https://jsonplaceholder.typicode.com/';

export const jsonPlaceholderApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
  tagTypes: ['Post'],
  endpoints: () => ({}),
});
