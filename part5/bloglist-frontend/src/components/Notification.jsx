import { useEffect } from "react";

const Notification = ({ message, type, statusHandler }) => {

    useEffect(() => {
        if (!!message) {
            setTimeout(() => { statusHandler({ message: null }) }, 4000)
        }
    }, [message])

    if (!message) return null;

    return (
        <div className={`notification ${type}`}>{message}</div>
    )
}

export default Notification