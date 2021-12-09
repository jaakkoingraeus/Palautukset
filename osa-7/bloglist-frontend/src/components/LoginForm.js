import React from 'react'

const LoginForm = ({
    handleLogin,
    alertText,
    username,
    setUsername,
    password,
    setPassword
  }) => {
    return (
      <div>
        
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            Username
            <input
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({ target }) => setUsername(target.value)}
            />
            Password
            <input
            type = "text"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login now</button>
        </form>
      </div>
    )
  }

export default LoginForm