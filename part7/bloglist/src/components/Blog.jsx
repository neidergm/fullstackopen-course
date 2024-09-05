import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const blogStyle = {
  padding: 10,
  borderRadius: '5px',
  marginBottom: 5,
  background: '#f5f5f5',
}

const Blog = ({ blog }) => {
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
