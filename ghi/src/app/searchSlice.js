import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'name'
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers : {
        reset: (state) => {
            state.value = '';
        },
        search: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { reset, search } = searchSlice

export default searchSlice.reducer;
