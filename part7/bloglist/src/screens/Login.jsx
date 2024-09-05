import { useState } from 'react'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../store/notifications.slice'
import loginService from './../services/login'
import { setUserData } from '../store/user.slice'

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const dispatch = useDispatch()

    const onChangeHandler = ({ target }) => {
        setLoginData({ ...loginData, [target.name]: target.value })
    }

    const login = async (event) => {
        event.preventDefault()

        if (loginData.username === '' || loginData.password === '') {
            dispatch(
                setNotification({
                    message: 'username and password are required',
                    type: 'warning',
                })
            )
        }

        loginService
            .startLogin(loginData.username, loginData.password)
            .then((response) => {
                dispatch(
                    setUserData(response)
                )
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        message: 'wrong username or password',
                        type: 'error',
                    })
                )
            })
    }


    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={login}>
                <div>
                    <label>Username:</label>
                    <input
                        value={loginData.username}
                        name="username"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        value={loginData.password}
                        name="password"
                        onChange={onChangeHandler}
                        type="password"
                    />
                </div>

                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login