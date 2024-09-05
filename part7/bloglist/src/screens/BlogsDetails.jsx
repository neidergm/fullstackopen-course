import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from './../services/blogs'
import { Button } from 'react-bootstrap'

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
            <h2 className='border-start border-5 ps-3 mb-4 text-muted'>{blog.title}</h2>
            <div className="blog-details bg-light p-4 rounded-4">
                <p>Url: {blog.url}</p>
                <p>
                    <span className='me-3'>{blog.likes} likes</span>
                </p>
                <p>added by {blog.user.name}</p>

                <div className='d-flex justify-content-between'>
                    <div>
                        <Button variant='dark' onClick={likeBlog}>like</Button>
                    </div>
                    <div>
                        {user.username === blog.user.username && (
                            <Button variant='danger' onClick={deleteBlog}>Remove</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogsDetails