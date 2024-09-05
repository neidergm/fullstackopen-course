import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

const usersSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
        'setUsersList': (state, action) => {
            state.list = action.payload
        },
    }
})

export const {
    setUsersList
} = usersSlice.actions

export default usersSlice.reducer
