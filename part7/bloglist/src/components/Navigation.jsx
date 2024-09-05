import { useDispatch, useSelector } from 'react-redux'
import { clearUserData } from '../store/user.slice'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const user = useSelector(s => s.user)

    const dispatch = useDispatch()
    const closeSession = () => {
        dispatch(clearUserData())
    }

    return (
        <div style={{ display: 'flex', gap: '20px', backgroundColor: 'gray', alignItems: 'center', padding: '0px 20px' }}>
            <div>
                <Link to='/'>Blogs</Link>
            </div>
            <div>
                <Link to='users'>Users</Link>
            </div>
            <div>
                <h4>{user.name} logged in</h4>
            </div>
            <div>
                <button onClick={closeSession}>logout</button>
            </div>
        </div>)
}

export default Navigation