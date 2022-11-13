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

  useEffect(() => {
    const userLoginInfo = window.localStorage.getItem('userLoginInfo')
    if (userLoginInfo) {
      console.log(userLoginInfo)
      const user = JSON.parse(userLoginInfo)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("loggin in as", username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('userLoginInfo', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('error loggin in as', username, password)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('userLoginInfo')
    setUser(null)
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
            username={ user.username }
            handleLogOut={ handleLogOut }
          />) 
      }
    </div>
  )
}

export default App
