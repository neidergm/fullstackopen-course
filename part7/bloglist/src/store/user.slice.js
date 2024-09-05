import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
    initialState: () => {
        const loggedUser = localStorage.getItem('bloglist-user')
        if (!loggedUser) {
            return {}
        }
        return JSON.parse(loggedUser)
    },
    name: 'user',
    reducers: {
        'setUserData': (state, action) => {
            localStorage.setItem('bloglist-user', JSON.stringify(action.payload))
            return action.payload
        },
        'clearUserData': () => {
            localStorage.removeItem('bloglist-user')
            return initialState
        }
    }
})

export const {
    setUserData,
    clearUserData
} = userSlice.actions

export default userSlice.reducer
