import PropTypes from 'prop-types'

const CreateBlogForm = ({ submit }) => {

    const submitForm = (event) => {
        event.preventDefault()
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        submit(blog)
        event.target.reset()
    }

    return (
        <form onSubmit={submitForm}>
            <div>
                <label>Title:</label>
                <input name="title" placeholder='title' />
            </div>
            <div>
                <label>Author:</label>
                <input name="author" placeholder='author' />
            </div>
            <div>
                <label>Url:</label>
                <input name="url" />
            </div>

            <button>create</button>
        </form>
    )
}

CreateBlogForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default CreateBlogForm