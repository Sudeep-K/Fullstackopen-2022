import React from 'react'
import Display from './Display';

function Statistics( {good, neutral, bad, all} ) {
    
    const computeAverage = () => {
        return ((good-bad)/all);
    }

    const positivePerc = () => {
        return (good/all * 100)
    }
  
    return (
        <>
            <Display text={'average'} count={computeAverage()} />
            <Display text={'positive'} count={positivePerc()} />
        </>
  )
}

export default Statistics