import axios from 'axios'

const addAnecdote = (newAnecdote) => {
    return axios.post('http://localhost:3001/anecdotes', newAnecdote).then(response => response.data)
}

// const deleteContact = (id) => {
//     return axios.delete(`http://localhost:3001/persons/${id}`).then(response => response.data)
// }

const getAnecdotes = () => {
    return axios.get(`http://localhost:3001/anecdotes`).then(response => response.data)
}

// const updateContacts = (id, data) => {
//     return axios.put(`http://localhost:3001/persons/${id}`, data).then(response => response.data)
// }

export {
    addAnecdote,
    getAnecdotes
}