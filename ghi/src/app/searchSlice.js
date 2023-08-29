import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const counterSlice = createSlice({
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

export const { reset, search } = searchSlice.action

export default searchSlice.reducer;
