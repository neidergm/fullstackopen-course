import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const blogStyle = {
  padding: 10,
  borderRadius: '5px',
  marginBottom: 5,
  background: '#f5f5f5'
}

const Blog = ({ blog, refreshList, user }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [blogData, setBlogData] = useState(blog)

  const toggleDetails = () => setShowDetails(s => !s)

  const likeBlog = () => {
    const { id, user, ...blog } = blogData
    blog.likes += 1
    blog.user = user.id
    blogService.update(id, blog).then(data => {
      setBlogData(data)
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)) {
      blogService.remove(blogData.id).then(() => {
        refreshList()
      })
    }
  }

  return (
    <div style={blogStyle}>
      {blogData.title} {blogData.author}
      <button onClick={toggleDetails}>
        {showDetails ? 'hide' : 'view'}
      </button>

      <div style={showDetails ? {} : { display: 'none' }}>
        <p> {blogData.url}</p>
        <p> {blogData.likes} likes
          <button onClick={likeBlog}>like</button>
        </p>
        <p>added by {blogData.user.name}</p>
        {user.username === blog.user.username && <button onClick={deleteBlog}>Remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  refreshList: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog