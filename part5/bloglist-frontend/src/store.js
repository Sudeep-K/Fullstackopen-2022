import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        user: userReducer
    }
})

export default store