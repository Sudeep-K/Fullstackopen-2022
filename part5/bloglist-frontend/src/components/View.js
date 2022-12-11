import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import Blogs from './Blogs/Blogs';
import Blog from './Blogs/Blog';
import Users from './Users/Users';
import User from './Users/User';

import { userLogout } from '../reducers/user';

const View = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch( userLogout() )
    }

  return (
    <div>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        <b>{user.name} logged in</b>
        <button onClick={ handleLogout }>Logout</button>

        <h2>blog app</h2>

        <Routes>
            <Route path='/' element={ <Blogs /> } />
            <Route path='/blogs/:id' element={ <Blog /> } />
            <Route path='/users/:id' element={ <User /> } />
            <Route path='/users' element={ <Users /> } />
        </Routes>
    </div>
  )
}

export default View