const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose');

const logger = require('../utils/logger')

const api = supertest(app);

test("Blogs are returned as json", async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
})

test("Ids are defined in blogs", async () => {
    const result = await api.get('/api/blogs')

    const allHaveId = result.body.every(blog => blog.id)

    assert.strictEqual(allHaveId, true)
})

describe("Save new blog", { only: true }, () => {

    test("with valid blog data", { only: true }, async () => {
        const initialBlogs = await api.get('/api/blogs');

        const newBlog = {
            title: `New test blog - ${initialBlogs.body.length + 1}`,
            author: "NeiderG",
            url: "https://test.ng",
            likes: 0,
            userId: "66a9187e8b2d4e5190760d70"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get('/api/blogs');

        assert.strictEqual(blogs.body.length, initialBlogs.body.length + 1)
    })

    test("without likes", async () => {
        const newBlog = {
            title: "New blog without likes",
            author: "NeiderG",
            url: "https://test.ng",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get('/api/blogs');

        const allHaveLikes = blogs.body.every(blog => "likes" in blog)

        assert.strictEqual(allHaveLikes, true)
    })

    test("without url or title", async () => {
        const newBlog = {
            author: "NeiderG",
            url: "https://test.ng",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe("Delete a blog", () => {
    test("any valid blog id", async () => {
        const initialBlogs = await api.get('/api/blogs');

        const blogToDelete = initialBlogs.body[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })

    test("With invalid id", async () => {
        const blog_id = "1234abcd"
        await api
            .delete(`/api/blogs/${blog_id}`)
            .expect(400)
    })
})

test("Update likes", async () => {
    const initialBlogs = await api.get('/api/blogs');
    const blogToUpdate = initialBlogs.body[0];
    const blogToUpdateData = {
        likes: blogToUpdate.likes + 1
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdateData)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close();
})