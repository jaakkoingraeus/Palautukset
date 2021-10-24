import anecdotes, { postAnecdote, putAnecdote } from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//ACTION CREATOR FUNCTIONS
export const voteAnecdote = ( id ) => {
  return async dispatch => {
    const anecdote = await putAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = ( event ) => {
  event.preventDefault()
  const obj = asObject(event.target.anecdote.value)

  return async dispatch => {
    const anecdote = await postAnecdote(obj)
    dispatch({
      type: 'CREATE_NEW',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = ( ) => {
  return async dispatch => {
    const notes = await anecdotes.getAll()
    dispatch({
      type: 'INIT',
      data: notes
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const findAne = state.find( n => n.id === action.data.id ) 
      const moreVotes = {
        ...findAne,
        votes: findAne.votes + 1
      }
      const newState = state.map( n => (
        n.id !== action.data.id ? n : moreVotes
      ))
      return newState
    case 'CREATE_NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer