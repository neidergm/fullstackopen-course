import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from "../queries";
import PropTypes from 'prop-types'
import SetBirthYear from './SetBirthYear';

const Authors = (props) => {

  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  const authors = data.allAuthors

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {props.loggedIn && <div>
        <h2>Set birthyear</h2>
        <SetBirthYear />
      </div>}
    </>
  )
}

Authors.propTypes = {
  show: PropTypes.bool,
  loggedIn: PropTypes.bool
}

export default Authors
