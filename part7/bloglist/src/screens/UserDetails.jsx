import { useEffect, useState } from 'react'
import usersService from './../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersList } from '../store/users.slice'
import { useParams } from 'react-router-dom'

const UserDetails = () => {

  const users = useSelector(s => s.users.list)
  const dispatch = useDispatch()
  const [user, setUser] = useState()


  const { id: userId } = useParams()

  useEffect(() => {
    const u = users.find(u => u.id === userId)
    setUser(u)
  }, [])

  if (!user) return <div>User not found</div>

  return (
    <div>
      <h2 className='text-muted border-start border-5 ps-3 mb-4'>{user.name}</h2>

      <div className="blog-details bg-light p-4 rounded-4">
        <h4>Added blogs</h4>
        <div className='mt-4'>
          <ul>
            {user.blogs.map(b => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserDetails