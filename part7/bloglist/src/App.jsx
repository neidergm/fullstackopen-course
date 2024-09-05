import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import { useDispatch } from 'react-redux'
import { setNotification } from './store/notifications.slice'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const createBlogRef = useRef(null)

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
        setUser(response)
        localStorage.setItem('bloglist-user', JSON.stringify(response))
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

  const closeSession = () => {
    setUser(null)
    localStorage.removeItem('bloglist-user')
  }

  const addBlog = (blog) => {
    if (blog.title === '' || blog.author === '' || blog.url === '') {
      return dispatch(
        setNotification({
          message: 'title, author and url are required',
          type: 'warning',
        })
      )
    }

    blogService.create(blog).then((returnedBlog) => {
      dispatch(
        setNotification({ message: 'a new blog added', type: 'success' })
      )

      setBlogs((b) => [
        ...b,
        { ...returnedBlog, user: { ...user, id: returnedBlog.user } },
      ])
      createBlogRef.current.toggleVisibility()
    })
  }

  const getBlogsList = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('bloglist-user')

    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }

  }, [])

  useEffect(() => {
    if (user) {
      getBlogsList()
    }
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        <b>{user.name} logged in</b>
        <button onClick={closeSession}>logout</button>
      </div>

      <br />
      <Toggleable btnText="new blog" ref={createBlogRef}>
        <h2>create new</h2>
        <CreateBlogForm submit={addBlog} />
      </Toggleable>
      <br />

      <div className="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              refreshList={getBlogsList}
            />
          ))}
      </div>
    </div>
  )
}

export default App
