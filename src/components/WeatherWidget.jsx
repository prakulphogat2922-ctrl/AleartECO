import React, { useState, useEffect } from 'react'
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react'
import weatherService from '../services/weatherService'
import storageService from '../services/storageService'
import { useLocation } from '../hooks/useLocation.jsx'
import { formatTime } from '../utils/helpers'

const WeatherWidget = ({ className = '' }) => {
  const { location, hasLocation } = useLocation()
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (hasLocation) {
      fetchWeatherData()
    } else {
      setLoading(false)
    }
  }, [hasLocation, location])

  const fetchWeatherData = async () => {
    if (!location) return

    setLoading(true)
    setError(null)

    try {
      // Check for cached data first
      const locationKey = `${location.latitude}_${location.longitude}`
      const cachedData = storageService.getCachedWeatherData(locationKey)
      
      if (cachedData) {
        setWeather(cachedData)
        setLoading(false)
        return
      }

      // Fetch fresh data
      const weatherData = await weatherService.getCurrentWeather(
        location.latitude, 
        location.longitude
      )
      
      setWeather(weatherData)
      
      // Cache the data
      storageService.cacheWeatherData(locationKey, weatherData)
      
    } catch (err) {
      setError('Unable to load weather data')
      console.error('Weather fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (iconCode) => {
    // In a real app, you'd use actual weather icons
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return iconMap[iconCode] || '🌤️'
  }

  if (!hasLocation) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <div className="text-center text-gray-500">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Enable location for weather updates</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <div className="text-center text-red-500">
          <p className="text-sm">{error || 'Weather data unavailable'}</p>
          <button 
            onClick={fetchWeatherData}
            className="mt-2 text-xs text-primary-600 hover:text-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{weather.name}</span>
        </div>
        <span className="text-xs text-gray-500">
          Updated {formatTime(new Date())}
        </span>
      </div>

      {/* Main Weather */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl" role="img" aria-label="weather icon">
            {getWeatherIcon(weather.weather[0]?.icon)}
          </span>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {weather.weather[0]?.description}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            Feels like {Math.round(weather.main.feels_like)}°C
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          <span className="text-gray-600">Humidity</span>
          <span className="font-medium">{weather.main.humidity}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="h-4 w-4 text-gray-500" />
          <span className="text-gray-600">Wind</span>
          <span className="font-medium">{weather.wind?.speed || 0} m/s</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Gauge className="h-4 w-4 text-yellow-500" />
          <span className="text-gray-600">Pressure</span>
          <span className="font-medium">{weather.main.pressure} hPa</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-purple-500" />
          <span className="text-gray-600">Visibility</span>
          <span className="font-medium">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchWeatherData}
        className="w-full mt-4 text-xs text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded py-1"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Refresh Weather'}
      </button>
    </div>
  )
}

export default WeatherWidget