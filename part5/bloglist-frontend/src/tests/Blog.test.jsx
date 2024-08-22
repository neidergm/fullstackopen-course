import { render, screen } from '@testing-library/react'
import Blog from './../components/Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

    const blog = {
        likes: 10,
        title: 'Component testing is done with react-testing-library',
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com',
        user: { username: 'test' }
    }

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} user={blog.user} refreshList={() => { }} />).container
    })

    test('Show title and author', async () => {
        const element = await screen.findByText('Component testing is done with react-testing-library Edsger W. Dijkstra', { exact: false })
        expect(element).toBeDefined()
    })

    test('Dont show url and likes by default', async () => {
        const detailsDiv = container.querySelector('div.blog-details')

        expect(detailsDiv).toHaveStyle('display: none')
    })

    test('Show url and likes after clicking the button', async () => {

        const detailsDiv = container.querySelector('div.blog-details')

        const button = screen.getByText('view')
        const user = userEvent.setup()
        await user.click(button)

        expect(detailsDiv).not.toHaveStyle('display: none')
    })
})
