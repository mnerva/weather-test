import { useState } from 'react';
import React from 'react';
import './App.css';
import { createMockServer } from './createMockServer';

if(process.env.NODE_ENV === 'development'){
  createMockServer();
}

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([])
  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  }

  const buttonClickHandler = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
    .then((result) => {
      return result.json()
    })
    .then((cities) => {
      setSearchResults(cities.map((city) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      })))
    })
  }

  const selctCity = (city) => {
    setSelected([city, ...selected]);
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <input type="text" data-testid="seacrh-input" onChange={inputChangeHandler}/>
      <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>

      <div data-testid="search-results">
        {searchResults.map((city) => <div key={`${city.lat}-${city.lon}`} onClick={() => selectCity(city)}>{city.name}, {city.lat}, {city.lon}</div>)}
      </div>

    <div data-testid="my-weather-list">
      {selected && selected.map((city) => <div 
          key={`${city.lat}-${city.lon}`}>
          {city.name}
        </div>)}
    </div>

    </div>
  );
}

export default App;