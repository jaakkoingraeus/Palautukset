import React from 'react'
import './Alert.css'

const Alert = (props) => {
    const { text, status } = props.alertText

    if (text === "") {
        return <></>
    }

    return (
        <div className="alertContainer">
          <h2 className={`alertText ${status ? 'green' : 'red'}`}>{ text }</h2>
        </div>
    )
}

export default Alert

