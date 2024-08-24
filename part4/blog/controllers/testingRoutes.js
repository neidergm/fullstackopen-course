const testingRouter = require('express').Router()
const Blog = require('../models/blogs');
const User = require('../models/users');

testingRouter.post("/reset/:username", async (request, response) => {
    
    const user = await User.findOneAndDelete({ username: request.params.username })
    await Blog.deleteMany({user: user.id})

    response.status(204).end()
})

module.exports = testingRouter;