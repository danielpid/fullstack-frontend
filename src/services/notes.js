import axios from 'axios'

console.log('process.env.REACT_APP_BACKEND_URL_BASE', process.env.BACKEND_URL_BASE)

const baseUrl = `${process.env.REACT_APP_BACKEND_URL_BASE}/notes`

const getData = response => response.data

const getAll = () => axios.get(baseUrl).then(getData)

const create = newObject => axios.post(baseUrl, newObject).then(getData)
  
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(getData)
  
export default { getAll, create, update }