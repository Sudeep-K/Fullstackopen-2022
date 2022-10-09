import React from 'react'

function Countries({ countries, setShowCountry }) {
    if (countries.length > 10 ) return <p>Too many matches, specify another filter</p>

    if (countries.length === 1) return setShowCountry([ countries[0] ])
  
    return (
        <>
            {
                countries.map(country =>
                    <div key={country.numericCode}>
                        {country.name} <button onClick={() => setShowCountry([ country ])}>show</button>
                    </div>
                )
            }
        </>
  )
}

export default Countries