import React, { useState } from 'react'

const LoginForm = ({handleLogin}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2> Login </h2>
      <form onSubmit={handleSubmit}>
        <div>
          username: {' '}
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
            name="Username"
          />
        </div>
        <div>
          password: {' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm