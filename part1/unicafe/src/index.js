import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
);

const Statistics = (props) => {
  const { good, bad, neutral} = props;
  const all = good + bad + neutral
  const average= (good + bad + neutral) / 3
  const positive = (good / all) * 100

  return (
    <div>
      <h2>Statistics</h2>
      {
        !good && !bad && !neutral ? (
        <div>No feedback given</div>
        ):(
          <table>
            <thead></thead>
            <tbody>
              <Statistic text="good" value={good} />
              <Statistic text="neutral" value={neutral} />
              <Statistic text="bad" value={bad} />
              <Statistic text="all" value={all} />
              <Statistic text="average" value={average} />
              <Statistic text="positive" value={`${positive} %`} />
            </tbody>
          </table>
        )
      }
    </div>
  )
}


const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
 
    const handleGoodClick = (value) => {
      setGood(value)
    }

    const handleNeutralClick = (value) => {
      setNeutral(value)
    }

    const handleBadClick = (value) => {
      setBad(value)
    }

   
  
    return (
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={() => handleGoodClick(good + 1)} />
        <Button text="neutral" handleClick={() => handleNeutralClick(neutral + 1)} />
        <Button text="bad" handleClick={() => handleBadClick(bad + 1)} />
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

