import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './services/anecdotes'
import { useNotification } from './reducer/notificationReducer'

const App = () => {

  const { notification, setNotification } = useNotification();

  const queryClient = useQueryClient();

  const uptadeAnecdoteVote = useMutation({ mutationFn: voteAnecdote })

  const { isLoading, isError, error, data: anecdotes } = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAll,
      retry: false
    }
  )

  const handleVote = (anecdote) => {
    const ane = { ...anecdote, votes: anecdote.votes + 1 }
    uptadeAnecdoteVote.mutate(ane, {
      onSuccess: () => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        const newAnecdotes = anecdotes.map(a => a.id === ane.id ? ane : a)
        queryClient.setQueryData(['anecdotes'], newAnecdotes)

        setNotification(anecdote.content + " has been voted")

      }
    })
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not avalaible due problems in server:{error.message}</div>
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
