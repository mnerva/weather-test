import { useState } from 'react';
import React from 'react';
import './App.css';
import { createMockServer } from './createMockServer';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';

if(process.env.NODE_ENV === 'development'){
  createMockServer();
}

function App() {
  const [selected, setSelected] = useState([])

  const selectCity = (city) => {
    setSelected([city, ...selected]);
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <Search onSelectedItem={selectCity}/>

      <div data-testid="my-weather-list">
        {selected && selected.map((city) => <div 
            key={`${city.lat}-${city.lon}`}>
            {city.name}
          </div>)}
      </div>
      <>WeatherCard city={selectCity}</>
    </div>
  );
}

export default App;