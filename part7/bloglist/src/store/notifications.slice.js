import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null
}

const notificationsSlice = createSlice({
    initialState,
    name: 'notifications',
    reducers: {
        'setNotification': (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        'clearNotification': () => {
            return initialState
        }
    }
})

export const {
    clearNotification,
    setNotification
} = notificationsSlice.actions

export default notificationsSlice.reducer
