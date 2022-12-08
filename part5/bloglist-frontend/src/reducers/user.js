import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import blogsServices from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})

export const initialiseUser = () => {
    return async dispatch => {
        const userLoginInfo = window.localStorage.getItem('userLoginInfo')
        if (userLoginInfo) {
            const user = JSON.parse(userLoginInfo)
            blogsServices.setNewToken(user.token)
            dispatch( setUser(user) )
        }
    }
}

export const userLogin = (userInfo) => {
    return async dispatch => {
        const user = await loginServices.login(userInfo)
        window.localStorage.setItem('userLoginInfo', JSON.stringify(user))
        blogsServices.setNewToken(user.token)
        dispatch( setUser(user) )
    }
}

export const userLogout = () => {
    return async dispatch => {
        window.localStorage.removeItem('userLoginInfo')
        blogsServices.setNewToken(null)
        dispatch( removeUser() )
    }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer