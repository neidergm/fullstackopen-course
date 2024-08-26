import AnecdoteList from './components/AnecdoteList'
import NewAnecdoteForm from './components/newAnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <NewAnecdoteForm />
    </div>
  )
}

export default App