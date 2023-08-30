import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const scrumpApi = createApi({
    reducerPath: 'scrumpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/recipes"
    }),
    endpoints: (builder) => ({
        getAllRecipes: builder.query({
            query: () => 'api/recipes',
            transformResponse: (response) => response.recipe
        }),
    }),
})

export const { useGetAllRecipesQuery } = scrumpApi
