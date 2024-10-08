const User = require("../models/users");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });

    const passwordCorrect = user !== null && await bcrypt.compare(password, user.password)

    if (!passwordCorrect) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter