import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {

  return (
    <div>
      <h2> Login </h2>
      <form onSubmit={handleSubmit}>
        <div>
          username: {' '}
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            name="Username"
          />
        </div>
        <div>
          password: {' '}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm