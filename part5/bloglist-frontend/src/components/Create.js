import React from 'react'

function Create({ title, setTitle, author, setAuthor, url, setUrl, handleSubmit }) {
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