import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css"; // Import styles

const Weather = () => {
  const [city, setCity] = useState("New York"); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const API_KEY = "enter the key"; // Replace with your OpenWeatherMap API key

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=48e49eddf32f623c841af7e93a112881`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found! Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather when component mounts
  useEffect(() => {
    fetchWeather();
  }, [city]); // Runs only once when component mounts

  return (
    <div>
       <div className="container">
      <h2 className="title">🌤 Weather App</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        
      </div>

      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country} 🇺🇳</h3>
          <p>🌡 Temperature: <strong>{weather.main.temp}°C</strong></p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>🌥 Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default Weather;
