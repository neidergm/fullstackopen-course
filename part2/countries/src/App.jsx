import { useEffect } from 'react'
import { useState } from 'react'
import Countries from './Countries';

function App() {

  const [countries, setCountries] = useState([]);

  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
  }, [])

  return (
    <div>
      <div>
        find countries <input
          type='search'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      <div>
        {filter &&
          <Countries countries={countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))} />
        }
      </div>
    </div>
  )
}

export default App
