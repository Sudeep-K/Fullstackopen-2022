import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setNewToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async content => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, content, config)
  return response.data
}

const addComment = async (object, comment) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  comment = {
    comment
  }
  const response = await axios.post(`${baseUrl}/${object.id}/comment`, comment, config)
  return response
}

const updateLike = async object => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(`${baseUrl}/${object.id}`, object, config)
  return response
}

const deleteBlog = async objectId => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.delete(`${baseUrl}/${objectId}`, config)
  return response
}

export default { getAll, create, addComment, updateLike, deleteBlog, setNewToken }