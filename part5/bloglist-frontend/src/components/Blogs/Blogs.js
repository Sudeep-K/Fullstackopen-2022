import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeBlogs } from '../../reducers/blogs'

import Create from '../Create'
import Togglable from './../Togglable';

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch( initializeBlogs() )
  }, [dispatch])


  return (
    <div>
      <Togglable buttonLabel='create'>
        <Create />
      </Togglable>

      <ul>
        { blogs.map(blog => <Link to={ `/blogs/${blog.id}` }>{blog.title}<br /></Link>) }
      </ul>
    </div>
  )
}

export default Blogs