import axios from "axios"

const startLogin = async (username, password) => {
    const response = await axios.post('/api/login', { username, password })
    return response.data
}

export default {
    startLogin
}