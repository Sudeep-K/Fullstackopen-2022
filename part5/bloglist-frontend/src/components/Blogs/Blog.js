import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from './../../reducers/blogs';

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch( likeBlog(updatedBlog) )
  } 

  const handleDelete = () => {
    const id = blog.id
    dispatch( removeBlog(id) )
  }

  return (
    <div>
      <i> { blog.title } </i>
      <b> { blog.author } </b>
      <i> { blog.likes } </i>
      <button onClick={ handleLikes }>Like</button>
      <button onClick={ handleDelete }>Remove</button>
    </div>
  )  
}

export default Blog