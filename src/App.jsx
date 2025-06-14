import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('');
  
  useEffect(() => {
      fetch('https://api.weatherapi.com/v1/current.json?key=bd5c71a803864d6eb58221153251306&q=chicago')
        .then(response => response.json())
        .then(data => {
          console.log(data); // helpful for debugging
          setWeatherData(data);
        })
        .catch(error => console.error("Error fetching weather:", error));
    }, []);
    function handleSubmit() {
      if (!city) return; // don’t do anything if input is empty

      fetch(`https://api.weatherapi.com/v1/current.json?key=bd5c71a803864d6eb58221153251306&q=${city}`)
        .then(response => response.json())
        .then(data => {
          console.log(weatherData.current);
          console.log(data); // check if it worked
          setWeatherData(data); // update the screen with new data
          setCity(''); // (optional) clear the input field
        })
        .catch(error => {
          console.error("Error fetching weather:", error);
        });

    }
    function getImagesForCondition(condition, tempF) {
      if (!condition || (lower.includes('clear')) return {
        background: `${import.meta.env.BASE_URL}images/background_auora.png`,
        kelvin: `${import.meta.env.BASE_URL}images/kelvin_default.png`,
        kelvinX: '50%',
        kelvinY: '80%',
        kelvinSize: '300px'
      };
      const lower= condition.toLowerCase();
      const highTemp = 90;

      if((lower.includes('sun')) && (tempF < highTemp )) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_sunny.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_happy.png`,
          kelvinX: '50%',
          kelvinY: '67%',
          kelvinSize: '300px'
        };
    //HIGH HEAT dependent on temperature instead
      }  else if ((lower.includes('sun')) && (tempF >= highTemp )) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_highHeat.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_highHeat.png`,
          kelvinX: '50%',
          kelvinY: '80%',
          kelvinSize: '300px'
        };
      } else if (lower.includes ('cloudy') || lower.includes('overcast')) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_overcast.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_happy.png`,
          kelvinX: '50%',
          kelvinY: '80%',
          kelvinSize: '300px'
        };
      } else if (lower.includes ('rain')) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_rainy.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_wet_happy.png`,
          kelvinX: '50%',
          kelvinY: '80%',
          kelvinSize: '300px'
        };
      } else if (lower.includes ('snow')) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_snow.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_cold_happy.png`,
          kelvinX: '50%',
          kelvinY: '80%',
          kelvinSize: '300px'
        };
      } else if (lower.includes ('fog') || lower.includes('mist')) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_mist.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_happy.png`,
          kelvinX: '50%',
          kelvinY: '80%',
          kelvinSize: '300px'
        };
      } else if (lower.includes ('dust')) {
        return {
          background: `${import.meta.env.BASE_URL}images/background_dust.png`,
          kelvin: `${import.meta.env.BASE_URL}images/kelvin_sad.png`,
          kelvinX: '50%',
          kelvinY: '85%',
          kelvinSize: '300px'
        };
      }
    }

    const images = weatherData ? getImagesForCondition(weatherData.current.condition.text, weatherData.current.temp_f) : null;

  return (
    <div
  style={{
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  }}>

    <div style= {{
      backgroundImage: `url(${images?.background})`,
      backgroundSize:'cover',
      backgroundPosition: 'cener',
      minHeight: '100vh',
      padding: '20px',
      
    }}>
    {weatherData && images && (
    <div
      style={{
        position: 'absolute',
        left: images.kelvinX,
        top: images.kelvinY,
        transform: 'translate(-50%, -50%)', // centers Kelvin at his X/Y
        width: images.kelvinSize
      }}
    >
      <img
        src={images.kelvin}
        alt="Kelvin the rock"
        style={{ width: '100%' }}
      />
    </div>
    )}

      <h1>Kelvin's Weather Report</h1>
      <input 
          id="location" 
          type="text"
          value={city} 
          onChange={(e)=> setCity(e.target.value)}
          placeholder="Enter a city"
      />
      <button id="submit" onClick={handleSubmit}>Update Location</button>
      
      {weatherData? (
        <div>
          <p>Location: {weatherData.location.name}</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_f}°F</p>
          <p>Wind: {weatherData.current.wind_mph}mph</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather . . . </p>
      )}
    </div>
</div>
  );  
}

export default App
