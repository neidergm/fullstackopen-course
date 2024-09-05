import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from './notifications.slice'
import blogsSlice from './blogs.slice'

const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        blogs: blogsSlice
    }
})


export default store