import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = (props) => {

  const {countries, searchWeather, weather, setSearch} = props;

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    searchWeather(country.name)
    return (
      <CountryDetails
        country={country}
        weather={weather}
      />
    )
  }

  return (
    <div>
      {countries.map(country => (
        <Country
          key={country.numericCode}
          country={country}
          setSearch={setSearch}
        />
      ))}
    </div>
  )
}

export default Countries 