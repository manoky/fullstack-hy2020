let timer = null
export const setNotification = (message, sec) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_MESSAGE',
      message
    })

    clearTimeout(timer)

    timer = setTimeout(() => {
      dispatch(resetNotification())
    }, sec)

  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE',
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {

  case 'SET_MESSAGE':
    return action.message

  case 'RESET_MESSAGE':
    return initialState

  default:
    return state
  }
}

export default reducer