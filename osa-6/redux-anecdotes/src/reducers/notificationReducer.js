import React from 'react'

const initialState = {
    text: null
}

export const setNotification = ( text ) => {
    return ({
        type: 'SET',
        data: { text }
    })
}

export const removeNotification = ( text ) => {
    return ({
        type: 'REMOVE'
    })
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REMOVE':
            return { text: null }
        case 'SET':
            return { text: action.data.text }
        default:
            return state
    }
}

export default notificationReducer
