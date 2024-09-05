import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

const blogsSlice = createSlice({
    initialState,
    name: 'blogs',
    reducers: {
        'setBlogs': (state, action) => {
            state.list = action.payload
        },
    }
})

export const {
    setBlogs
} = blogsSlice.actions

export default blogsSlice.reducer
