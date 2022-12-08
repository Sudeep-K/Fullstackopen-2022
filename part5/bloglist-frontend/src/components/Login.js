import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userLogin } from '../reducers/user'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username,
      password
    }
    dispatch( userLogin(user) )
    setUsername('')
    setPassword('')
  }

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
