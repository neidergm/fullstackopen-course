const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require("bcrypt")
const { usersInDb } = require('../utils/list_helper')

usersRouter.get("/", async (request, response) => {
    const result = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 })
    response.json(result)
})

usersRouter.post("/", async (request, response) => {

    const body = request.body;

    if (body.password.length < 3) {
        return response.status(400).json({ error: 'Password have to be min 3 characters' })
    }

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)

    body.password = password

    const user = new User({ ...body })

    const result = await user.save()
    response.status(201).json(result)
})

module.exports = usersRouter;