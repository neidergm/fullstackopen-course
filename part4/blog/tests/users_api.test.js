const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose');
const helper = require("./../utils/list_helper")

const logger = require('../utils/logger')

const api = supertest(app);

describe("Create an user", { only: true }, () => {
    test("with valid data", async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            "name": `Neider GM${usersAtStart.length}`,
            "username": `neiderg${usersAtStart.length}`,
            "password": "123456789"
        }

        await api.post("/api/users").send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(user.username))
    })

    test("return error if username already exist", async () => {
        const user = {
            "name": `XXXXXXX`,
            "username": `neiderg`,
            "password": "123456789"
        }

        await api.post("/api/users")
            .send(user)
            .expect(400)
    })

    test("return error if password isn't valid", { only: true }, async () => {
        const user = {
            "name": `XXXXXXX`,
            "username": `neidergxxx`,
            "password": "12"
        }

        await api.post("/api/users")
            .send(user)
            .expect(400)
    })
})



test("Get users list", async () => {
    await api.get("/api/users")
        .expect(200)
        .expect('Content-Type', /application\/json/);
})

after(async () => {
    await mongoose.connection.close();
})
