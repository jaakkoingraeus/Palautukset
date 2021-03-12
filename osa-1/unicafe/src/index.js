import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Grade = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const Statisticsline = (props) => {
  return (
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
    <tbody>
      <Statisticsline text='good' value={props.good}/>
      <Statisticsline text='neutral' value={props.neutral}/>
      <Statisticsline text='bad' value={props.bad}/>
      <Statisticsline text='all' value={props.good + props.neutral + props.bad}/>
      <Statisticsline text='average' value={(props.good * 1 + props.bad * (-1)) / (props.good + props.neutral + props.bad)}/>
      <Statisticsline text='positive' value={props.good / (props.good + props.neutral + props.bad) * 100 + '%'}/>
    </tbody>
    </table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    return (
      setGood(good + 1)
    )
  }

  const addNeutral = () => {
    return (
      setNeutral(neutral + 1)
    )
  }

  const addBad = () => {
    return (
      setBad(bad + 1)
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Grade text='good' handleClick={addGood}/>
        <Grade text='neutral' handleClick={addNeutral}/>
        <Grade text='bad' handleClick={addBad}/>
      </div>
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)