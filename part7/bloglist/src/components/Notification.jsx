import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../store/notifications.slice'

const Notification = () => {

  const dispatch = useDispatch()
  const { message, type } = useSelector(s => s.notifications)

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearNotification())
      }, 4000)
    }
  }, [message])

  if (!message) return null

  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification
