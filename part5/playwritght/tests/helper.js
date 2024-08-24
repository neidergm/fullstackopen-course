const loginFor = async (page, username, password) => {
    await page.getByRole("textbox").first().fill(username)
    await page.getByRole("textbox").last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createABlog = async (page, title, author, url) => {

    await page.getByRole("button", { name: "new blog" }).click()

    await page.fill('input[name="title"]', title)
    await page.fill('input[name="author"]', author)
    await page.fill('input[name="url"]', url)

    await page.getByRole("button", { name: "create" }).click()
    return page
}

export { loginFor, createABlog }