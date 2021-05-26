import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.post(baseUrl, blog, config)
  console.log('Added blog: ', res)
}

export default { getAll, addBlog, setToken }