import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [notification, setNotification] = useState({ message: null })

  const onChangeHandler = ({ target }) => {
    setLoginData({ ...loginData, [target.name]: target.value })
  }

  const login = async (event) => {
    event.preventDefault()

    if (loginData.username === '' || loginData.password === '') {
      return setNotification({ message: 'username and password are required', type: 'warning' })
    }

    loginService.startLogin(loginData.username, loginData.password)
      .then(response => {
        setUser(response)
        localStorage.setItem('bloglist-user', JSON.stringify(response))
      }).catch(error => {
        setNotification({ message: 'wrong username or password', type: 'error' });
      })
  }

  const closeSession = () => {
    setUser(null)
    localStorage.removeItem('bloglist-user')
  }

  const addBlog = (e) => {
    e.preventDefault();

    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }

    if (blogObject.title === '' || blogObject.author === '' || blogObject.url === '') {
      return setNotification({ message: 'title, author and url are required', type: 'warning' })
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setNotification({ message: 'a new blog added', type: 'success' })
        setBlogs(b => [...b, returnedBlog])
        e.target.reset();
      })
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('bloglist-user');

    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification {...notification} statusHandler={setNotification} />

        <form onSubmit={login}>
          <div>
            <label>Username:</label>
            <input value={loginData.username} name="username" onChange={onChangeHandler} />
          </div>
          <div>
            <label>Password:</label>
            <input value={loginData.password} name="password" onChange={onChangeHandler} type='password' />
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
      <Notification {...notification} statusHandler={setNotification} />

      <div>
        <b>{user.name} logged in</b>
        <button onClick={closeSession}>logout</button>
      </div>

      <br />
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            <label>Title:</label>
            <input name="title" />
          </div>
          <div>
            <label>Author:</label>
            <input name="author" />
          </div>
          <div>
            <label>Url:</label>
            <input name="url" />
          </div>

          <button>create</button>
        </form>
      </div>
      <br />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App