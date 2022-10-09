import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');

  const hook = () => {
    const eventHandler = (response) => {
      setCountries(response.data);
    }

    const promise = axios.get(`https://restcountries.com/v2/name/${countryQuery}`);
    promise.then(eventHandler);
  }

  useEffect(hook, [countryQuery]);

  const handleQueryChange = (event) => {
    setCountryQuery(event.target.value);
    if (countries.length === 1) return setShowCountry([ countries[0] ])
  }

  const handleShowCountry = () => {
    if (countries.length > 10 ) {
      return <p>Too many matches, specify another filter</p>
    }
  
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

  return (
    <>
      <form>
        find countries: <input value={countryQuery} onChange={handleQueryChange}/>
      </form>
      {handleShowCountry()}
      {showCountry.length === 1 ? <Country country={showCountry[0]} /> : <p></p>}
    </>
  );
}

export default App;
