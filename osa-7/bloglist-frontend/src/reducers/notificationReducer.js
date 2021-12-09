export const removeNotification = () => {
    return ({
        type: 'REMOVE',
        status: true
    })
}

let currentTimeout = null

export const setNotification = (text, status, time) => {
    return async dispatch => {
        dispatch({
            type: 'ADD',
            data: {
                text: text,
                status: status
            }
        })
        currentTimeout = setTimeout( () =>
            dispatch({
                type: 'REMOVE',
                status: true
            }), (time * 1000))
    }
}

const initialStatus = {
    text: 'Testi',
    status: true
}

const notificationReducer = (state = initialStatus, action) => {
    switch (action.type) {
        case 'ADD':
            return (action.data)
        case 'REMOVE':
            console.log('Removing notifications...')
            return ({
                text: '',
                status: true,
            })
        default:
            return state
    }
}

export default notificationReducer