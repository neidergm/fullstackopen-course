import { useState } from 'react'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../store/notifications.slice'
import loginService from './../services/login'
import { setUserData } from '../store/user.slice'
import { Button, Container, Form } from 'react-bootstrap'

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const dispatch = useDispatch()

    const onChangeHandler = ({ target }) => {
        setLoginData({ ...loginData, [target.name]: target.value })
    }

    const login = async (event) => {
        event.preventDefault()

        if (loginData.username === '' || loginData.password === '') {
            return dispatch(
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
                        type: 'danger',
                    })
                )
            })
    }

    return (
        <Container>
            <Notification />
            <div className='d-flex flex-column mx-auto mt-5 p-5 bg-light rounded-5' style={{ maxWidth: '400px' }}>
                <h2 className='mb-5'>Log in to application</h2>
                <Form onSubmit={login}>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            value={loginData.username}
                            name="username"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            value={loginData.password}
                            name="password"
                            onChange={onChangeHandler}
                            type="password" />
                    </Form.Group>

                    <div className='text-center mt-5'>
                        <Button type="submit">Login</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Login