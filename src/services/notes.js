import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL_BASE}/api/notes`

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getData = response => response.data

const getAll = () => axios.get(baseUrl).then(getData)

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
  
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(getData)
  
export default { getAll, create, update, setToken }