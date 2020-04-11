export const setNotification = (message) => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE',
  }
}

const initialState = null;

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