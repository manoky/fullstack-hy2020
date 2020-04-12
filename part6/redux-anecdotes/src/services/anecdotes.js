import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNew = async (content) => {
  const request = await axios.post(baseUrl, { content, votes: 0 })
  return request.data
}

const update = async (id, newObj) => {
  const updateObj = {
    content: newObj.content,
    votes: newObj.votes + 1
  }

  const request = await axios.put(`${baseUrl}/${id}`, updateObj)
  return request.data
}

export default {
  getAll,
  createNew,
  update
}