import axios from 'axios'

const addContact = (newPerson) => {
    return axios.post('http://localhost:3001/persons', newPerson).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`).then(response => response.data)
}

const getContacts = () => {
    return axios.get(`http://localhost:3001/persons`).then(response => response.data)
}

const updateContacts = (id, data) => {
    return axios.put(`http://localhost:3001/persons/${id}`, data).then(response => response.data)
}

export {
    addContact,
    deleteContact,
    getContacts,
    updateContacts
}