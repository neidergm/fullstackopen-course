import { useQuery } from "@apollo/client"
import { ME, RECOMMENDATIONS_FOR_FAVORITE_GENRE } from "../queries"
import PropTypes from 'prop-types'

const Recommendations = ({ show }) => {

    const { loading, error, data } = useQuery(RECOMMENDATIONS_FOR_FAVORITE_GENRE)
    const { loading: meLoading, data: meData } = useQuery(ME)

    if (!show) {
        return null
    }

    if (meLoading || loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <strong>{meData.me.favoriteGenre}</strong></p>

            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.allBooks.map(book => {
                            return (
                                <tr key={book.title}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.published}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

Recommendations.propTypes = {
    show: PropTypes.bool.isRequired
}

export default Recommendations