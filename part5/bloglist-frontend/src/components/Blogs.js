import React from 'react'
import Blog from './Blog'
import Create from './Create'
import Togglable from './Togglable'

function Blogs({ blogs, setBlogs, username, handleLogOut, create, notification, setNotification }) {
  return (
    <>
        <h1>blogs</h1>
        
        {
          notification === null ?
          true : 
          (
            <div className='notification'> { notification } </div>
          )
        }

        <p>
          <strong>{ username }</strong> has logged-in
          <button onClick={handleLogOut}>log out</button>
        </p>

        <Togglable buttonLabel='new blog'>
          <Create
            create={ create }
          />
        </Togglable>

        { 
          Array.from(blogs).map(blog => {
            return <Blog 
                      key={blog.id}
                      blog={blog} 
                      blogs={blogs} 
                      setBlogs={ setBlogs } 
                      notification={ notification } 
                      setNotification={ setNotification } 
                    />
          })
        }
    </>
  )
}

export default Blogs