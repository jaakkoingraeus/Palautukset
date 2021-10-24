import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const createNewAnecdote = ( event ) => {
        console.log('new anecdote')
        dispatch(createAnecdote(event))
        dispatch(setNotification('new anecdote created', 5))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
            <div><input name="anecdote"/></div>
            <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
