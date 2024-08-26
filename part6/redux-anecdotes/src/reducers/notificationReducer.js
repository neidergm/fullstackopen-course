import { createSlice } from "@reduxjs/toolkit";

const defaultState = ''

const notificationReducer = createSlice(
    {
        name: "notification",
        initialState: defaultState,
        reducers: {
            setNotification: (state, action) => {
                return action.payload
            }
        }
    })

export default notificationReducer.reducer;

export const {
    setNotification
} = notificationReducer.actions