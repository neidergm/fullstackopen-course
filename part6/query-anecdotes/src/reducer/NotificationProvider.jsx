/* eslint-disable react/prop-types */
import React from 'react'
import NotificationContext, { notificationReducer } from './notificationReducer'
import { useReducer } from 'react'

const NotificationProvider = (props) => {

    const [counter, counterDispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider