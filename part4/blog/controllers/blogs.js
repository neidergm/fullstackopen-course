const blogsRouter = require('express').Router()
const Blog = require('../models/blogs');
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    const { likes, author, url, title, userId } = request.body;

    const user = await User.findById(userId);

    const blog = new Blog({
        likes,
        author,
        title,
        url,
        user: user.id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result)
})

blogsRouter.delete('/:id_blog', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id_blog)
    response.status(204).end()
})

blogsRouter.put('/:id_blog', async (request, response) => {
    const blog = request.body;
    const result = await Blog.findByIdAndUpdate(request.params.id_blog, blog, { new: true, runValidators: true, context: 'query' })
    response.json(result);
})

module.exports = blogsRouter;