import React from 'react'
import Blog from './Blog'

function Blogs({ blogs }) {
  return (
    <>
        <h1>blogs</h1>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

export default Blogs