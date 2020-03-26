import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)
  const [ country, setCountry] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  console.log(api_key, weather)

  useEffect(() => {

    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => console.log(error))
  
  },[])

  useEffect(() => {
    if (country) {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => console.log(error))
    }
  
  },[country])

  const handleSearch = (e) => {
    const value = e.target.value
    if (value) {
      setSearch(value)
    } else {
      setSearch('')
    }
  }

  const filteredCountries = search 
    ? countries.filter(country => 
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : ''

  return (
    <div>
      <Filter handleSearch={handleSearch}/>

      {filteredCountries && (
        <Countries
          countries={filteredCountries}
          weather={weather}
          searchWeather={setCountry}
          setSearch={setSearch}
       />
      )}

    </div>
  );
}

export default App;
