import React from 'react'
import { useState } from 'react'

const Togglable = ( props ) => {
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

  return (
    <div>
        <div style={ hideWhenVisible } >
            <button onClick={ toggleVisibility }>{ props.buttonLabel }</button>
        </div>
        <div style={ showWhenVisible }>
            { props.children }
            <button onClick={ toggleVisibility }>cancel</button>
        </div>
    </div>
  )
}

export default Togglable