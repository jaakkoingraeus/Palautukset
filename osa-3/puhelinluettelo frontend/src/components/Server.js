import axios from 'axios';

const URL = '/api/persons'

const create = (newPerson) => {
  const request = axios.post(URL, newPerson)

  return  request.then( response => {
      return response.data
    })
}

const getAll = () => {
  return axios.get(URL).then( response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${URL}/${id}`).then(response => response.data)
}

const replace = (id, newPerson) => {
  const request = axios.put(`${URL}/${id}`, newPerson)
  return request.then( response => response.data)
}

export default { create, getAll, deletePerson, replace }