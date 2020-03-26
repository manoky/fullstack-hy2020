import React from 'react'

const CountryDetails = ({ country, weather }) => { console.log(weather)

  return (
    <div>
      <h2>{country.name}</h2>
      <div>{`capital ${country.capital}`}</div>
      <div>{`population ${country.population}`}</div>
  
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lang =>(
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <div style={{width: '100px'}}>
        <img
          src={country.flag}
          alt={country.name}
          style={{width: '100%'}}
        />
      </div>
      {weather && (
        <div>
          <h3>{`Weather in ${weather.location.name}`}</h3>
          <div>temperature: {weather.current.temperature}</div>
          <div>
            <img src={weather.current.weather_icons[0]} alt="" />
          </div>
          <div>wind: {weather.current.wind_speed}</div>
        </div>
      )}
    </div>
  )
}

export default CountryDetails