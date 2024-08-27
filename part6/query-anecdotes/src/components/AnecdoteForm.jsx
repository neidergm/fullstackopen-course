import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdotes"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({ mutationFn: addAnecdote })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newNoteMutation.mutate({ content, votes: 0 }, {
      onSuccess: (e) => {
        console.log('added new note')
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      }
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
