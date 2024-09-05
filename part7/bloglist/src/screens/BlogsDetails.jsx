import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from './../services/blogs'

const BlogsDetails = () => {

    const { id: blogId } = useParams()
    const navigate = useNavigate()

    const [blog, setBlog] = useState()
    const blogs = useSelector(s => s.blogs.list)
    const user = useSelector(s => s.user)

    const likeBlog = () => {
        const { id, user, ...b } = blog
        b.likes += 1
        b.user = user.id
        blogService.update(id, b).then((data) => {
            setBlog(data)
        })
    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            blogService.remove(blog.id).then(() => {
                navigate('/', { replace: true })
            })
        }
    }

    useEffect(() => {
        const b = blogs.find(b => b.id === blogId)
        setBlog(b)
    }, [])

    if (!blog) return null

    return (
        <div>
            <h2>{blog.title}</h2>
            <div className="blog-details">
                <p> {blog.url}</p>
                <p>
                    {' '}
                    {blog.likes} likes
                    <button onClick={likeBlog}>like</button>
                </p>
                <p>added by {blog.user.name}</p>
                {user.username === blog.user.username && (
                    <button onClick={deleteBlog}>Remove</button>
                )}
            </div>
        </div>
    )
}

export default BlogsDetails