import { useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const genres = ["gen1", "gen2", "gen3"]

const Books = (props) => {

  const [refetch, { loading, error, data }] = useLazyQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  const handleGenreFilter = (genre) => {
    setFilter(genre)
  }

  useEffect(() => {
    filter ? refetch({ genre: filter }) : refetch()
  }, [filter, refetch])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      {
        filter ? <p>in genre <strong>{filter}</strong></p> : null
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => filter ? book.genres.includes(filter) : true)
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <br />

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreFilter(null)}>All genres</button>
      </div>
    </div>
  )
}

//Prop types

Books.propTypes = {
  show: PropTypes.bool
}

export default Books
