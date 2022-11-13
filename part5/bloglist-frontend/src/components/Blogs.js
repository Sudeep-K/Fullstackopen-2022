import React from 'react'
import Blog from './Blog'

function Blogs({ blogs, username, handleLogOut }) {
  return (
    <>
        <h1>blogs</h1>
        <p>
          {console.log(username)}
          <strong>{ username }</strong> has logged-in
          <button onClick={handleLogOut}>log out</button>
        </p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

export default Blogs