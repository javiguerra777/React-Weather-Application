import React, { useState, useCallback, useEffect } from 'react';
import { getWeatherData } from '../services/WeatherService';
import SearchBar from '../components/SearchBar';
import WeatherData from '../components/WeatherData';

const Main = () => {
  const persistedLocation = localStorage.getItem('searchTerm');
  const [searchTerm, setSearchTerm] = useState(persistedLocation || 'Stockton, CA');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState(searchTerm);
  const fetchDataCallback = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getWeatherData(city);
      setWeatherData(response.data.list);
      setLoading(false);
      setError(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  }, [city]);
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setCity(searchTerm);
  }
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);
  return (
    <div id='main' className='container'>
      {/* Search Bar Component */}
      <SearchBar handleSubmit={handleSubmit} searchTerm={searchTerm} handleChange={handleChange} id={'search-city'}>
        <strong>Search City: {searchTerm}</strong>
      </SearchBar>
      {error && <p>There was an error loading your data</p>}
      {/* Iterating through array */}
      {loading ? <p>Data Loading</p> : (
        <WeatherData list={weatherData} />
      )}
    </div>
  );

}

export default Main