import anecdoteService from '../services/anecdotes'

export const toggleVote = (id, newobj) => {

  return async dispatch => {
    const anecdote = await anecdoteService.update(id, newobj)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const createAnecdote = (value) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(value)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {

  switch(action.type) {
  case 'VOTE': {
    const votedAnecdote = action.data

    return state.map(anecdote => {
      return anecdote.id === votedAnecdote.id
        ? votedAnecdote
        : anecdote
    })
  }
  case 'CREATE':
    return [...state, action.data]

  case 'INIT_ANECDOTES':
    return action.data

  default:
    return state
  }
}

export default reducer