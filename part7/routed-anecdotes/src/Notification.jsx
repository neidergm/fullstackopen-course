import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, statusHandler }) => {

    useEffect(() => {
        if (message) {
            setTimeout(() => { statusHandler("") }, 5000)
        }
    }, [message])

    if (!message) return null

    return (
        <div>{message}</div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired || null,
    type: PropTypes.string,
    statusHandler: PropTypes.func
}

export default Notification
