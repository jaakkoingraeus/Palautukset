import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Half Stack application development',
    id: 2,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 60,
        id: 2
      },
      {
        name: 'State of architecture',
        exercises: 14,
        id: 3
      } 
    ]
  }
]

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))