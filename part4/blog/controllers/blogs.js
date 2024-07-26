const blogsRouter = require('express').Router()
const Blog = require('../models/blogs');

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
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