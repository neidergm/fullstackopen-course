
const CreateBlogForm = ({ submit }) => {

    const submitForm = (event) => {
        event.preventDefault()
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }
        submit(blog, event)
    }

    return (
        <form onSubmit={submitForm}>
            <div>
                <label>Title:</label>
                <input name="title" />
            </div>
            <div>
                <label>Author:</label>
                <input name="author" />
            </div>
            <div>
                <label>Url:</label>
                <input name="url" />
            </div>

            <button>create</button>
        </form>
    )
}

export default CreateBlogForm