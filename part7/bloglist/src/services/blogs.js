import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('bloglist-user')).token}`,
    },
  })
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('bloglist-user')).token}`,
    },
  })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('bloglist-user')).token}`,
    },
  })
  return response.data
}

export default { getAll, create, update, remove }
