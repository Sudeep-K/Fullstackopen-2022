import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Blogs from './components/Blogs/Blogs';
import Login from './components/Login';

import { initialiseUser } from "./reducers/user";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch( initialiseUser() )
  }, [dispatch])

  return (
    <div>
      { user === null ? <Login /> : <Blogs />}
    </div>
    )
}

export default App
