import { useDispatch, useSelector } from 'react-redux'
import { clearUserData } from './store/user.slice'
import {
  Routes,
  Route
} from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import Users from './screens/Users'
import UserDetails from './screens/UserDetails'
import BlogsDetails from './screens/BlogsDetails'

import './index.css'
import Notification from './components/Notification'

const App = () => {

  const user = useSelector(s => s.user)

  const dispatch = useDispatch()

  const closeSession = () => {
    dispatch(clearUserData())
  }

  if (!user.username) {
    return <Login />
  }

  return (
    <>
      <h2>blogs</h2>

      <div>
        <h4>{user.name} logged in</h4>
        <button onClick={closeSession}>logout</button>
      </div>

      <Notification />

      <br />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserDetails />} />
        <Route path='/blogs/:id' element={<BlogsDetails />} />
      </Routes>
    </>
  )
}

export default App
