import { createSlice } from "@reduxjs/toolkit";
import blogServices from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            return [...state, action.payload]
        },
        addComment(state, action) {
            const commentedBlog = action.payload
            return state.map(blog => blog.id !== commentedBlog.id ? blog : commentedBlog)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogServices.getAll()
        dispatch( setBlogs(blogs) )
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogServices.create(blog)
        dispatch( appendBlog(newBlog) )
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        await blogServices.addComment(blog, comment)
        dispatch( addComment(blog) )
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogServices.updateLike(blog)
        dispatch( updateBlog(blog) )
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogServices.deleteBlog(id)
        dispatch( deleteBlog(id) )
    }
}

export const { setBlogs, appendBlog, addComment, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer