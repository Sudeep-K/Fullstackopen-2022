import React from 'react'

function VisibilityFilter() {
    const filterSelected = (value) => {
        console.log(value)
    }
    
  return (
    <div>
        all <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
        important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
        non-important <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')} />
    </div>
  )
}

export default VisibilityFilter