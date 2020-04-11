import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => 
    state.sort((a,b) => b.votes - a.votes)
  )

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(toggleVote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
       <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => vote(anecdote.id)}
      />
      )}
    </>
  )
}

export default AnecdoteList