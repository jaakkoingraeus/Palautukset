import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => (
      anecdotes.filter( a => a.content.includes(filter.filter) )
  ))
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(setNotification('you voted an anecdote', 5))
    }
    
    const compareVotes = (a, b) => {
        return b.votes - a.votes
    }

    return (
        <>
        {anecdotes.sort(compareVotes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList
