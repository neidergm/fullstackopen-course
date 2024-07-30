const User = require("../models/users");

const totalLikes = (blogs) => {
    return blogs.reduce((p, c) => p + c.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    return blogs.reduce((p, c) => p.likes > c.likes ? p : (
        {
            title: c.title,
            author: c.author,
            likes: c.likes
        }
    ), {})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const authors = blogs.reduce((p, c) => {
        p[c.author] ? p[c.author]++ : p[c.author] = 1;
        return p;
    }, {})

    return Object.entries(authors).reduce((p, [author, blogs]) => {
        return blogs > p.blogs ? { author, blogs } : p
    }, { blogs: 0 })
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    const authors = blogs.reduce((p, c) => {
        p[c.author] ? p[c.author] += c.likes : p[c.author] = c.likes;
        return p;
    }, {})

    return Object.entries(authors).reduce((p, [author, likes]) => {
        return likes > p.likes ? { author, likes } : p
    }, { likes: 0 })
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb
}