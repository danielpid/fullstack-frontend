import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getData = response => response.data

const getAll = () => axios.get(baseUrl).then(getData)

const create = newObject => axios.post(baseUrl, newObject).then(getData)
  
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(getData)
  
export default { getAll, create, update }