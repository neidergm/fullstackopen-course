import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import NewAnecdoteForm from './components/newAnecdoteForm'

const App = () => {
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