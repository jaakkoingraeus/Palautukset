import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const postAnecdote = async ( object ) => {
    const res = await axios.post(baseUrl, object)
    return res.data
}

export const putAnecdote = async ( id ) => {
    const anecdoteToMod = await axios.get(`${baseUrl}/${id}`)
    const res = await axios.put(`${baseUrl}/${id}`,
        {
            ...anecdoteToMod.data,
            votes: anecdoteToMod.data.votes + 1
        }
    )
    return res.data
}

export default { getAll }