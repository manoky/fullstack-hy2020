import React from 'react'

const Country = ({country, setSearch}) => (
  <div>
    {country.name}{' '}
    <button onClick={() => setSearch(country.name)}>
      show
    </button>
  </div>
)


export default Country