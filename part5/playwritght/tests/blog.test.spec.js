const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginFor, createABlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset/usertest')

        await request.post('/api/users', {
            data: {
                name: 'User For Testing',
                username: 'usertest',
                password: '123456789'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('fails with wrong credentials', async ({ page }) => {
            loginFor(page, 'usertest0', '1234567890')

            await expect(page.getByText('wrong username or password')).toBeVisible()
        })

        test('succeeds with correct credentials', async ({ page }) => {
            loginFor(page, 'usertest', '123456789')
            await expect(page.getByText('User For Testing logged in')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            loginFor(page, 'usertest', '123456789')
        })

        test('Can create a new blog post', async ({ page }) => {
            await createABlog(page, 'My new blog post', 'Me', 'https://example.com')

            await expect(page.getByText('My new blog post')).toBeVisible()
        })

        test('Can like a blog post', async ({ page }) => {
            await createABlog(page, 'My new blog post', 'Me', 'https://example.com')

            const blogContainer = await page.getByText('My new blog post Me').locator('..')

            await blogContainer.getByRole('button', { name: 'view' }).click()
            await blogContainer.getByRole('button', { name: 'like' }).click()
            await expect(blogContainer.getByText('1 likes')).toBeVisible()
        })


        test('Can delete a blog post', async ({ page }) => {
            await createABlog(page, 'My new blog post', 'Me', 'https://example.com')

            const blogContainer = await page.getByText('My new blog post Me').locator('..')

            await blogContainer.getByRole('button', { name: 'view' }).click()
            
            page.on('dialog', dialog => dialog.accept());
            await blogContainer.getByRole('button', { name: 'Remove' }).click()

            await expect(page.getByText('My new blog post Me')).not.toBeVisible()
        })
    })

})