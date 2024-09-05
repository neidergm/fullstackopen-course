import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import CreateBlogForm from '../components/CreateBlogForm'
import Notification from '../components/Notification'
import Toggleable from '../components/Toggleable'
import { useEffect, useRef } from 'react'
import { setNotification } from '../store/notifications.slice'
import { setBlogs } from '../store/blogs.slice'
import blogService from './../services/blogs'

const Home = () => {
  const createBlogRef = useRef(null)

  const user = useSelector(s => s.user)
  const blogs = useSelector(s => s.blogs.list)
  const dispatch = useDispatch()

  const getBlogsList = () => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
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

      dispatch(
        setBlogs([
          ...blogs,
          { ...returnedBlog, user: { ...user, id: returnedBlog.user } },
        ])
      )
      createBlogRef.current.toggleVisibility()
    })
  }

  useEffect(() => {
    getBlogsList()
  }, [])

  return (
    <div>
      <br />
      <Toggleable btnText="new blog" ref={createBlogRef}>
        <h2>create new</h2>
        <CreateBlogForm submit={addBlog} />
      </Toggleable>
      <br />

      <div className="blogs-list">
        {[...blogs]
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

export default Home