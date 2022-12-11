import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { initialiseUsers } from '../../reducers/users'

const User = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const userId = useParams().id
    const user = users.find(user => user.id === userId)

    useEffect(() => {
        dispatch( initialiseUsers() )
    }, [dispatch])

    if (!user) {
        return null
    }

  return (
    <div>
        <h3>{user.name}</h3>
        <h4>added blogs</h4>

        <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
    </div>

  )
}

export default User