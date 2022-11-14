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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs =>
      setBlogs( fetchedBlogs )
    )  
  }, [])

  useEffect(() => {
    const userLoginInfo = window.localStorage.getItem('userLoginInfo')
    if (userLoginInfo) {
      console.log(userLoginInfo)
      const user = JSON.parse(userLoginInfo)
      blogService.setNewToken(user.token)
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
      blogService.setNewToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setNotification(`Wrong credentials`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('userLoginInfo')
    setUser(null)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    blogService.create(newBlog)
    .then(returnedBlog => {
      setBlogs([...blogs, returnedBlog])
      setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  return (
    <div>
      {
        user === null ?
          (<Login 
            notification={ notification }
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
            title={ title }
            setTitle={ setTitle }
            author={ author }
            setAuthor={ setAuthor }
            url={ url }
            setUrl={ setUrl }
            handleSubmit={ handleSubmit }
            notification={ notification }
          />) 
      }
    </div>
  )
}

export default App
