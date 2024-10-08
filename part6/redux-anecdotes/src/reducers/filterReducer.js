import { createSlice } from "@reduxjs/toolkit";

const defaultState = ''

const filterReducer = createSlice(
    {
        name: "filter",
        initialState: defaultState,
        reducers: {
            setFilter: (state, action) => {
                return action.payload
            }
        }
    })

export default filterReducer.reducer;

export const {
    setFilter
} = filterReducer.actions