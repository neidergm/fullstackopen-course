import { useEffect } from 'react'
import usersService from './../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersList } from '../store/users.slice'

const Users = () => {

  const users = useSelector(s => s.users.list)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getUsers().then((response) => {
      console.log(response)
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
                <td>{u.name}</td>
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