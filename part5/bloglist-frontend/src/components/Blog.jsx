import { useState } from "react"
import blogService from "../services/blogs";

const blogStyle = {
  padding: 10,
  borderRadius: "5px",
  marginBottom: 5,
  background: "#f5f5f5"
}

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false);
  const [blogData, setBlogData] = useState(blog)

  const toggleDetails = () => setShowDetails(s => !s)

  const likeBlog = () => {
    const {id, user, ...blog} = blogData;
    blog.likes += 1;
    blog.user = user.id;
    blogService.update(id, blog).then(data => setBlogData(data))
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
      </div>
    </div>
  )
}

export default Blog