import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries"

const SetBirthYear = () => {

    const [updateAuthor, { loading, error }] = useMutation(UPDATE_BIRTHYEAR)
    const { data: authors } = useQuery(ALL_AUTHORS);

    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const submit = (e) => {
        e.preventDefault()
        updateAuthor({ variables: { name, born: Number(born) } })

        setName('')
        setBorn('')
    }

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            {error && <div>{error.message}</div>}
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={(e) => setName(e.target.value)} disabled={!authors?.allAuthors.length}>
                        <option value={""}>Seleccione...</option>
                        {authors?.allAuthors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
                    </select>
                </div>
                <div>
                    born
                    <input value={born} onChange={(e) => setBorn(e.target.value)} />
                </div>
                <button>update author</button>
            </form>
        </div>
    )
}

export default SetBirthYear