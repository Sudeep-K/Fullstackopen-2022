import React from 'react'
import Blog from './Blog'
import Create from './Create'

function Blogs({ blogs, username, handleLogOut, title, setTitle, author, setAuthor, url, setUrl, handleSubmit }) {
  return (
    <>
        <h1>blogs</h1>
        
        <p>
          <strong>{ username }</strong> has logged-in
          <button onClick={handleLogOut}>log out</button>
        </p>

        <Create
          title={ title }
          setTitle={ setTitle }
          author={ author }
          setAuthor={ setAuthor }
          url={ url }
          setUrl={ setUrl }
          handleSubmit={ handleSubmit }
        />

        { 
          Array.from(blogs).map(blog => {
            return <Blog key={blog.id} blog={blog} />
          })
        }
    </>
  )
}

export default Blogs