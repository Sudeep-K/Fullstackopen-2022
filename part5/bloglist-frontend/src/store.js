import blogsReducer from './reducers/blogs'
import usersReducer from './reducers/users'
import userReducer from './reducers/user'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer,
        user: userReducer
    }
})

export default store