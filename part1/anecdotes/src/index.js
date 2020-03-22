import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => (
  <>
    <h1>Anecdote of the day</h1>
    <div>{props.text}</div>
    <div>has {props.votes} votes</div>
  </>
)

const MostVotes = (props) => (
  <div>
    <h2>Anecdote with most votes</h2>
    {props.anecdote}
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))

  const handleClick = () => {
    const rand = Math.floor(Math.random() * 6)

    setSelected(rand)
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1
    setVotes(newVotes); console.log(votes)
  }

  const mostVotes = () => {
    const most = Math.max.apply(Math, votes)
    const index = most > 0 && votes.findIndex(vote => vote === most);
    const mostVoted = (
      <>
        <div>{anecdotes[index]}</div>
        <div>has {votes[index]} votes</div>
      </>
    )

    return most > 0 ? mostVoted : '';
  }

  return (
    <div>
      <Anecdote
        text={props.anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button handleClick={handleVote} text="Vote" />{' '}
      <Button handleClick={handleClick} text="Next anecdote"/>
      {mostVotes() && <MostVotes anecdote={mostVotes()} />}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)