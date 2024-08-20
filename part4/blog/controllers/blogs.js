const blogsRouter = require('express').Router()
const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    const { likes, author, url, title } = request.body;

    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        likes,
        author,
        title,
        url,
        user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result)
})

blogsRouter.delete('/:id_blog', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id_blog);

    if (blog) {
        if (blog.user?.toString() !== decodedToken.id.toString()) {
            return response.status(401).json({ error: 'unauthorized' })
        }

         await Blog.deleteOne({ _id: blog.id })
    }


    // await Blog.findByIdAndDelete(request.params.id_blog)
    response.status(204).end()
})

blogsRouter.put('/:id_blog', async (request, response) => {
    const blog = request.body;
    const result = await Blog.findByIdAndUpdate(request.params.id_blog, blog, { new: true, runValidators: true, context: 'query' })
    response.json(result);
})

module.exports = blogsRouter;