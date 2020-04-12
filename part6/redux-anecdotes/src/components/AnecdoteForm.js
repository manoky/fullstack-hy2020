import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = ({ createAnecdote, setNotification }) => {

  const createNew = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    createAnecdote(content)
    setNotification(`new anecdote '${content}'`, 5000)
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

export default connect(null,
  { createAnecdote, setNotification }
)(AnecdoteForm)