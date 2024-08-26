import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteActions"

const NewAnecdoteForm = () => {

    const dispatch = useDispatch()

    const save = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        
        dispatch(createAnecdote(content))
        
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={save}>
            <div>
                <h2>create new</h2>
            </div>

            <div>
                <label>content</label>
                <input name="anecdote" />
            </div>

            <button>create</button>
        </form>
    )
}

export default NewAnecdoteForm