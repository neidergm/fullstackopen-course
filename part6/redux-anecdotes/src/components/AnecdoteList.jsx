import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteActions"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })
  
  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)

    dispatch(vote(id))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
            <br />
          </div>
        )}
    </div>
  )
}

export default AnecdoteList