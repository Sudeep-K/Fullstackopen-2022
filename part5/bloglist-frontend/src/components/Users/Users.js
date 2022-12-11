import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { initialiseUsers } from '../../reducers/users'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch( initialiseUsers() )
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>

      {users.map(user => <Link to={`/users/${user.id}`} key={user.id}>{user.name}</Link>)}
    </div>
  )
}

export default Users