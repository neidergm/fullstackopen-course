import { useContext } from "react";
import { createContext } from "react";

const NotificationContext = createContext();

export const notificationReducer = (state, action) => {

    switch (action.type) {
        case 'SET':
            return action.payload

        case 'CLEAR':
            return ''

        default:
            return state
    }
}

let timer = null;
export const useNotification = () => {
    const [notification, dispatch] = useContext(NotificationContext)

    const setNotification = (message) => {
        dispatch({ type: 'SET', payload: message })

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, 5000)
    }

    return {
        notification,
        setNotification
    }
}

export default NotificationContext;
