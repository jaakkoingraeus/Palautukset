import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createNewAnecdote = ( event ) => {
        console.log('new anecdote')
        props.createAnecdote(event)
        props.setNotification('new anecdote created', 5)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm