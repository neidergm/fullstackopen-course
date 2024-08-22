import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type, statusHandler }) => {

    useEffect(() => {
        if (message) {
            setTimeout(() => { statusHandler({ message: null }) }, 4000)
        }
    }, [message])

    if (!message) return null

    return (
        <div className={`notification ${type}`}>{message}</div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired || null,
    type: PropTypes.string,
    statusHandler: PropTypes.func
}

export default Notification
