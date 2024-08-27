import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import Notification from "./Notification"
import { useEffect } from "react"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })

  const orderedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  useEffect(() => {
    if (anecdotes.length > 0) {
      dispatch(setNotification(orderedAnecdotes[0].content, 10))
    }
  }, [anecdotes])

  return (
    <div>
      <Notification />

      {orderedAnecdotes.sort((a, b) => b.votes - a.votes)
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