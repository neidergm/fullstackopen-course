import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/anecdotes"
import { useNotification } from "../reducer/notificationReducer"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({ mutationFn: addAnecdote })
  const { setNotification } = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newNoteMutation.mutate({ content, votes: 0 }, {
      onSuccess: (e) => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        setNotification("a new anecdote created")
      },
      onError: (r) => {
        setNotification(r.response.data.error)
      },
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
