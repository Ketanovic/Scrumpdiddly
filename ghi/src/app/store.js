import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from './searchSlice';
import { scrumpApi } from './apiSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer, //front end state
        [scrumpApi.reducerPath]: scrumpApi.reducer // api state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(scrumpApi.middleware),
})
