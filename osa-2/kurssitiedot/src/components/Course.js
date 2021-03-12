import React from 'react'

const Course = (props) => {
    console.log('Kurssit: ', props)
    return (
    <>
      <Header courseName={props.course.name}/>
      <Content courses={props.course.parts}/>
    </>
    )
}
  
const Header = (props) => {
    console.log('Koko kurssin nimi: ', props.courseName)
    return (
      <h1>{props.courseName}</h1>
    )
}

const Content = (props) => {
    console.log('kurssin osat: ', props.courses)
    const cours = props.courses
    return (
      <div>
        {cours.map(course => 
          <Part key={course.id} course={course}/>)}
          <Total courses={props.courses}/>
      </div>
    )
}

const Part = (props) => {
    console.log('Part: ', props.course)
    return (
      <p> {props.course.name} {props.course.exercises} </p>
    )
}

const Total = (props) => {
    console.log(props.courses)
    return (
      <h3>total of exercises {props.courses.map(value => value.exercises).reduce((a, b) => a + b )}</h3>
    )
}

export default Course