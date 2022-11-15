import React from 'react'
import { useState } from 'react'

function Create({ create }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        create({
            title,
            author,
            url
        })

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