import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const scrumpApi = createApi({
    reducerPath: 'scrumpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getAllRecipes: builder.query({
            query: () => 'api/recipes',
            transformResponse: (response) => response.recipe
        }),
    }),
})

export const { useGetAllRecipesQuery } = scrumpApi
