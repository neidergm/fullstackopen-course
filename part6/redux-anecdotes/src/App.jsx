import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import NewAnecdoteForm from './components/newAnecdoteForm'
import { useDispatch } from 'react-redux'
import { getAnecdotes } from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    getAnecdotes().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  )
}

export default App