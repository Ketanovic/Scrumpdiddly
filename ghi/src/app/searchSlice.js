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
        // add in slice to click on recipe
    }
});

export const { reset, search } = searchSlice.actions

export default searchSlice.reducer;
