import { useState } from "react"

const blogStyle = {
  padding: 10,
  borderRadius: "5px",
  marginBottom: 5,
  background: "lightgray"
}

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(s => !s)

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleDetails}>
        {showDetails ? 'hide' : 'view'}
      </button>

      <div style={showDetails ? {} : { display: 'none' }}>
        <p> {blog.url}</p>
        <p> {blog.likes} likes
          <button>like</button>
        </p>
        <p> {blog.author}</p>
      </div>
    </div>
  )
}

export default Blog