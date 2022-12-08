import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from '../../reducers/blogs'

import Blog from './Blog'
import Create from '../Create'
import Togglable from './../Togglable';
import { userLogout } from './../../reducers/user';

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch( initializeBlogs() )
  }, [dispatch])

  const handleLogout = () => {
    dispatch( userLogout() )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <b>{user.name} logged in</b>
      <button onClick={ handleLogout }>Logout</button>

      <Togglable buttonLabel='create'>
        <Create />
      </Togglable>

      { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
    </div>
  )
}

export default Blogs