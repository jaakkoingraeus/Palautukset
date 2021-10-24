import React from 'react'

export const setFilter = (filter) => {
    return ({
        type: 'SET_FILTER',
        data: { filter }
    })
}

const filterReducer = (state = { filter: '' }, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.data
        default:
            return state
    }
}

export default filterReducer
