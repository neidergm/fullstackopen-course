import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginData, setLoginData] = useState({ username: '', password: '' })

  const onChangeHandler = ({ target }) => {
    setLoginData({ ...loginData, [target.name]: target.value })
  }

  const login = async (event) => {
    event.preventDefault()
    loginService.startLogin(loginData.username, loginData.password)
    .then(response => {
      setUser(response)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={login}>
          <div>
            <label>Username:</label>
            <input value={loginData.username} name="username" onChange={onChangeHandler} />
          </div>
          <div>
            <label>Password:</label>
            <input value={loginData.password} name="password" onChange={onChangeHandler} />
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
      <div>
        <b>{user.name} logged in</b>
      </div>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App