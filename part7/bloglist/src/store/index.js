import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from './notifications.slice'
import blogsSlice from './blogs.slice'
import userSlice from './user.slice'
import usersSlice from './users.slice'

const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        blogs: blogsSlice,
        user: userSlice,
        users: usersSlice
    }
})


export default store