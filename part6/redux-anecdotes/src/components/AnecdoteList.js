import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  const { anecdotes, toggleVote, setNotification } = props

  const vote = (id, anecdote) => {
    toggleVote(id, anecdote)
    setNotification(`you voted '${anecdote.content}'`, 5000)

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

const mapStateToProps = state => {
  const sortedAnecdotes =
      state.anecdotes.sort((a,b) => b.votes - a.votes)

  if (state.filter) {
    return {
      anecdotes: sortedAnecdotes.filter(anecdote =>
        anecdote.content.toLowerCase()
          .includes(state.filter.toLowerCase())
      )
    }
  }
  return {
    anecdotes: sortedAnecdotes
  }
}


export default connect(
  mapStateToProps,
  { toggleVote, setNotification }
)(AnecdoteList)