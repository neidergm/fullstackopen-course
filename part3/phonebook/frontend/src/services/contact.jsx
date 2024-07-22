import axios from 'axios'

const baseUrl = "/api/persons"

const addContact = (newPerson) => {
    return axios.post(`${baseUrl}`, newPerson).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const getContacts = () => {
    return axios.get(`${baseUrl}`).then(response => response.data)
}

const updateContacts = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data).then(response => response.data)
}

export {
    addContact,
    deleteContact,
    getContacts,
    updateContacts
}