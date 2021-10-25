import React from 'react'

const initialState = {
    text: null
}

let currentTimeout = null

export const setNotification = ( text, time ) => {
    if (currentTimeout !== null) {
        clearTimeout(currentTimeout)
        currentTimeout = null
    }

    return async dispatch => {
        dispatch({
            type: 'SET',
            data: { text }
        })
        currentTimeout = setTimeout( () => {
            dispatch({
                type: 'REMOVE'
            })
        }, (time * 1000))
    }
}

export const removeNotification = () => {
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
