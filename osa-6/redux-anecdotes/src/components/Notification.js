import { connect } from 'react-redux'
import React from 'react'


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
    { props.notification.text !== null &&
      <div style={style}>
        {props.notification.text}
      </div>
    }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
      notification: state.notification
    }
}

const connected = connect(mapStateToProps)(Notification)

export default connected