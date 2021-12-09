import axios from 'axios'
const baseUrl = "/api/users"

const getAll = () => {
    axios
        .get('/')
        .then( res => {
            console.log(res.data)
        })
        .catch( error => {
            console.error(error)
        })
}

export default { getAll }