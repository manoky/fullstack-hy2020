import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const login = async (credentials) => {
  const request = await axios.post(loginUrl, credentials)

  return request.data
}

export default {
  getAll,
  login,
  setToken
}