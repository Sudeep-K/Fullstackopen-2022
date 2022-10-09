import React from 'react'

function Country({ country }) {
  return (
    <>
        <h1>{country.name}</h1>
        <p>captial {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
            {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>

        <img src={country.flag} style={{height: "200px", border: "3px black solid"}} alt="country-flag"/>
    </>
  )
}

export default Country