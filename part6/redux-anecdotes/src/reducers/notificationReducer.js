import { createSlice } from "@reduxjs/toolkit";

const defaultState = ''
let timer = null;

const notificationReducer = createSlice(
    {
        name: "notification",
        initialState: defaultState,
        reducers: {
            setNotificationMessage: (state, action) => {
                return action.payload
            },
            clearNotification: () => {
                return defaultState
            }
        }
    })

export const setNotification = (message, duration) => {
    return dispatch => {
        dispatch(setNotificationMessage(message))

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
    }
}

export default notificationReducer.reducer;

export const {
    setNotificationMessage,
    clearNotification
} = notificationReducer.actions