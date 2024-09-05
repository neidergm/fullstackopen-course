import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from './notifications.slice'
import blogsSlice from './blogs.slice'
import userSlice from './user.slice'

const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        blogs: blogsSlice,
        user: userSlice
    }
})


export default store