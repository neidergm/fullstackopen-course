import { useSelector } from 'react-redux'
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
import Navigation from './components/Navigation'

const App = () => {

  const user = useSelector(s => s.user)

  if (!user.username) {
    return <Login />
  }

  return (
    <>
      <Navigation />

      <h2>blog app</h2>

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
