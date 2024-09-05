import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from './notifications.slice'

const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
    }
})


export default store