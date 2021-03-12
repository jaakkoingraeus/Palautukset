import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const indexOfMostVotes =  votes.indexOf(Math.max(...votes))

  const newText = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  

  const addVote = () => {
    const copy = [...votes]
    console.log(copy)
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdotes[selected]}
    </div>
    <div>
      has {votes[selected]} votes
    </div>
    <div>
      <button onClick={addVote}>vote</button>
      <button onClick={newText} set={setSelected}>next anecdote</button>
    </div>
    <h1>Anecdote with most votes</h1>
    <div>
      {anecdotes[indexOfMostVotes]}
      <div>
        has {votes[indexOfMostVotes]}
      </div>
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)