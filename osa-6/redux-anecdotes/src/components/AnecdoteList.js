import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id) => {
        console.log('vote', id)
        props.voteAnecdote(id)
        props.setNotification('you voted an anecdote', 5)
    }
    
    const compareVotes = (a, b) => {
        return b.votes - a.votes
    }

    return (
        <>
        {props.anecdotes.sort(compareVotes).map(anecdote =>
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

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter( a => a.content.includes(state.filter.filter))

  return {
    anecdotes: filteredAnecdotes
  }
}

const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdotes
