import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log("loggin in as", username, password)

    try {
      const user = loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('error loggin in as', username, password)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      {
        user === null ?
          (<Login 
            username={ username }
            password={ password } 
            setUsername={ setUsername } 
            setPassword={ setPassword }
            handleLogin={ handleLogin }
          />) :
          (<Blogs
            blogs={ blogs }
          />) 
      }
    </div>
  )
}

export default App
