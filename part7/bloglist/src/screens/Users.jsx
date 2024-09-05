import { useEffect } from 'react'
import usersService from './../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersList } from '../store/users.slice'
import { Link } from 'react-router-dom'

const Users = () => {

  const users = useSelector(s => s.users.list)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getUsers().then((response) => {
      dispatch(setUsersList(response))
    })
  }, [])

  return (
    <div>
      <table>
        <thead>
          <th></th>
          <th>Blogs created</th>
        </thead>
        <tbody>
          {
            users.map(u => (
              <tr key={u.id}>
                <td>
                  <Link to={`${u.id}`}>
                    {u.name}
                  </Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users