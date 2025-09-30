// Storage service for offline functionality
class StorageService {
  constructor() {
    this.storageKey = 'alearteco_data'
    this.isSupported = this.checkSupport()
  }

  checkSupport() {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      return false
    }
  }

  // Save data to localStorage
  save(key, data) {
    if (!this.isSupported) return false
    
    try {
      const existingData = this.load() || {}
      existingData[key] = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(this.storageKey, JSON.stringify(existingData))
      return true
    } catch (error) {
      console.error('Storage save error:', error)
      return false
    }
  }

  // Load data from localStorage
  load(key = null) {
    if (!this.isSupported) return null

    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) return null

      const parsedData = JSON.parse(data)
      
      if (key) {
        return parsedData[key]?.data || null
      }
      
      return parsedData
    } catch (error) {
      console.error('Storage load error:', error)
      return null
    }
  }

  // Remove specific data
  remove(key) {
    if (!this.isSupported) return false

    try {
      const existingData = this.load() || {}
      delete existingData[key]
      localStorage.setItem(this.storageKey, JSON.stringify(existingData))
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  }

  // Clear all app data
  clear() {
    if (!this.isSupported) return false

    try {
      localStorage.removeItem(this.storageKey)
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  }

  // Check if data is fresh (less than specified minutes old)
  isDataFresh(key, maxAgeMinutes = 5) {
    const item = this.load(key)
    if (!item || !item.timestamp) return false

    const ageMinutes = (Date.now() - item.timestamp) / (1000 * 60)
    return ageMinutes < maxAgeMinutes
  }

  // Save user preferences
  savePreferences(preferences) {
    return this.save('user_preferences', preferences)
  }

  // Load user preferences
  loadPreferences() {
    return this.load('user_preferences')
  }

  // Save emergency contacts
  saveEmergencyContacts(contacts) {
    return this.save('emergency_contacts', contacts)
  }

  // Load emergency contacts
  loadEmergencyContacts() {
    return this.load('emergency_contacts')
  }

  // Save alert history
  saveAlertHistory(alerts) {
    return this.save('alert_history', alerts)
  }

  // Load alert history
  loadAlertHistory() {
    return this.load('alert_history')
  }

  // Cache weather data
  cacheWeatherData(locationKey, weatherData) {
    return this.save(`weather_${locationKey}`, weatherData)
  }

  // Get cached weather data
  getCachedWeatherData(locationKey) {
    if (this.isDataFresh(`weather_${locationKey}`, 30)) { // 30 minutes fresh
      return this.load(`weather_${locationKey}`)
    }
    return null
  }
}

export default new StorageService()