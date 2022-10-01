import React from 'react'
import Display from './Display';

function Statistics( {good, neutral, bad, all} ) {
    
    const computeAverage = () => {
        return ((good-bad)/all);
    }

    const positivePerc = () => {
        return (`${good/all * 100} %`)
    }
  
    return (
        <>
            <tr>
                <Display text={'average'} count={computeAverage()} />
            </tr>
            <tr>
                <Display text={'positive'} count={positivePerc()} />
            </tr>
        </>
  )
}

export default Statistics