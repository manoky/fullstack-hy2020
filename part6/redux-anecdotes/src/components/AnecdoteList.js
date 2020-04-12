import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}{' '}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes =
      anecdotes.sort((a,b) => b.votes - a.votes)

    return filter ? sortedAnecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
      : sortedAnecdotes
  })

  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    dispatch(toggleVote(id, anecdote))
    dispatch(
      setNotification(`you voted '${anecdote.content}'`, 5000)
    )

  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote.id, anecdote )}
        />
      )}
    </>
  )
}

export default AnecdoteList