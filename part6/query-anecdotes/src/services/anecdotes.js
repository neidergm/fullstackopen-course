import axios from 'axios'

const addAnecdote = (newAnecdote) => {
    return axios.post('http://localhost:3001/anecdotes', newAnecdote).then(response => response.data)
}

const getAll = () => {
    return axios.get(`http://localhost:3001/anecdotes`).then(response => response.data)
}

const voteAnecdote = ({ id, ...anecdote }) => {
    return axios.patch(`http://localhost:3001/anecdotes/${id}`, anecdote).then(response => response.data)
}

export {
    addAnecdote,
    voteAnecdote,
    getAll
}