import axios from 'axios'
const baseUrl = "/api/login"

const login = async (credentials) => {
    console.log('Logging in', credentials)

    const config = () => {
        return
    }

    const response = await axios.post(baseUrl, credentials)

    console.log('User that got the token: ', response.data)

    return (
        response.data
    )
}

export default { login }