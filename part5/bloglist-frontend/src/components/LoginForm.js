import React from 'react'

const LoginForm = (props) => {
  const {
    username,
    password,
    handleLogin,
    setUsername,
    setPassword
  } = props

  return (
    <div>
      <h2> Login </h2>
      <form onSubmit={handleLogin}>
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