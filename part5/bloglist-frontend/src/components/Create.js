import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogs'

const Create = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch( createBlog({
            title,
            author,
            url,
            likes: 0
        }) )

        setTitle('')
        setAuthor('')
        setUrl('')
    }
  return (
    <div>
        <h1>create new</h1>
        <form onSubmit={ handleSubmit }>
            <div>
                title: 
                <input 
                    type='text'
                    name='Title'
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
            </div>
            <div>
                author: 
                <input 
                    type='text'
                    name='Author'
                    value={ author }
                    onChange={ (e) => setAuthor(e.target.value) }
                />
            </div>
            <div>
                url: 
                <input 
                    type='text'
                    name='Url'
                    value={ url }
                    onChange={ (e) => setUrl(e.target.value) }
                />
            </div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default Create