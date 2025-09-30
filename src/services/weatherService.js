// Weather API service for real-time climate data
class WeatherService {
  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || 'demo_key'
    this.baseUrl = 'https://api.openweathermap.org/data/2.5'
  }

  async getCurrentWeather(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      )
      if (!response.ok) {
        throw new Error('Weather data unavailable')
      }
      return await response.json()
    } catch (error) {
      console.error('Weather API error:', error)
      // Return mock data for demo
      return this.getMockWeatherData()
    }
  }

  async getWeatherAlerts(lat, lon) {
    try {
      const response = await fetch(
        `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&exclude=minutely,hourly,daily`
      )
      if (!response.ok) {
        throw new Error('Weather alerts unavailable')
      }
      const data = await response.json()
      return data.alerts || []
    } catch (error) {
      console.error('Weather alerts error:', error)
      // Return mock alerts for demo
      return this.getMockAlerts()
    }
  }

  async getForecast(lat, lon, days = 5) {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&cnt=${days * 8}`
      )
      if (!response.ok) {
        throw new Error('Forecast data unavailable')
      }
      return await response.json()
    } catch (error) {
      console.error('Forecast API error:', error)
      return this.getMockForecast()
    }
  }

  getMockWeatherData() {
    return {
      name: 'Your Location',
      main: {
        temp: 22,
        feels_like: 24,
        humidity: 65,
        pressure: 1013
      },
      weather: [
        {
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d'
        }
      ],
      wind: {
        speed: 3.5,
        deg: 180
      },
      visibility: 10000
    }
  }

  getMockAlerts() {
    return [
      {
        sender_name: 'National Weather Service',
        event: 'Severe Thunderstorm Warning',
        start: Date.now(),
        end: Date.now() + 2 * 60 * 60 * 1000,
        description: 'Severe thunderstorms with large hail and damaging winds expected.',
        tags: ['Thunderstorm', 'Wind', 'Hail']
      }
    ]
  }

  getMockForecast() {
    return {
      list: Array.from({ length: 5 }, (_, i) => ({
        dt: Date.now() + i * 24 * 60 * 60 * 1000,
        main: {
          temp: 20 + Math.random() * 10,
          humidity: 60 + Math.random() * 20
        },
        weather: [
          {
            main: i % 2 === 0 ? 'Clear' : 'Clouds',
            description: i % 2 === 0 ? 'clear sky' : 'few clouds',
            icon: i % 2 === 0 ? '01d' : '02d'
          }
        ]
      }))
    }
  }
}

export default new WeatherService()