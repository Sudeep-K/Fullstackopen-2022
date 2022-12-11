import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from './../../reducers/blogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const navigate = useNavigate()

  const blogId = useParams().id
  const blog = blogs.find(blog => blog.id === blogId)

  const [comment, setComment] = useState('')

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
    navigate('/')
  }

  const handleCommenting = () => {
    const commentedBlog = {
      ...blog,
      comments: [ ...blog.comments, comment ]
    }
    console.log(commentedBlog)
    dispatch( commentBlog(commentedBlog, comment) )
  }

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2> { blog.title } { blog.author} </h2>
      <a href={ blog.url } > { blog.url } </a>
      <p> { blog.likes } likes </p>
      <button onClick={ handleLikes }>Like</button>
      <button onClick={ handleDelete }>Remove</button>
      
      <h2>comments</h2>
      <input type='text' value={ comment } onChange={ (e) => setComment(e.target.value) } />
      <button onClick={ handleCommenting } >add comment</button>

      <ul>
        { blog.comments.map(c => <li>{c}</li>) }
      </ul>
    </div>
  )  
}

export default Blog