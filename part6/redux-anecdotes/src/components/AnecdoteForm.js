import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(value))
    dispatch(setNotification(`added: '${value}'`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }

  return (
    <div style={{ paddingBottom: 10 }}>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm