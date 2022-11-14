import React from 'react'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <>
        <h1>Login to application</h1>
        <form onSubmit={ handleLogin }>
            <div>
                Username: <input
                    type="text"
                    name="Username"
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }
                />
            </div>
            <div>
                Password: <input
                    type="password"
                    name="Password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default Login