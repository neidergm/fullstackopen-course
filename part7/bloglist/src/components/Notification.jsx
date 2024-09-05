import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../store/notifications.slice'
import { Alert } from 'react-bootstrap'

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

  return <Alert variant={type} className='mt-4'>{message}</Alert>
}

export default Notification
