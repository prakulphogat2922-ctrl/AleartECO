// Utility functions for the application

// Format date and time
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date))
}

export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options
  }
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date))
}

export const formatRelativeTime = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  return formatDate(date)
}

// Location utilities
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const toRadians = (degrees) => degrees * (Math.PI / 180)

export const formatDistance = (distanceKm) => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`
  }
  return `${distanceKm.toFixed(1)}km`
}

// Alert severity utilities
export const getAlertSeverity = (alertType) => {
  const severityMap = {
    'tornado': 'critical',
    'hurricane': 'critical',
    'earthquake': 'critical',
    'tsunami': 'critical',
    'wildfire': 'critical',
    'flood': 'warning',
    'severe_thunderstorm': 'warning',
    'winter_storm': 'warning',
    'heat_wave': 'warning',
    'air_quality': 'info',
    'frost': 'info',
    'wind': 'info'
  }
  
  return severityMap[alertType.toLowerCase()] || 'info'
}

export const getAlertPriority = (severity) => {
  const priorityMap = {
    'critical': 1,
    'warning': 2,
    'info': 3
  }
  
  return priorityMap[severity] || 3
}

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
  return phoneRegex.test(cleanPhone)
}

// Emergency utilities
export const generateSOSMessage = (location, customMessage = '') => {
  const baseMessage = 'EMERGENCY ALERT: I need immediate assistance.'
  const locationInfo = location 
    ? `My current location is: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
    : 'Location unavailable - please call me immediately.'
  
  const instructions = 'Please contact me immediately or send help.'
  
  return `${baseMessage} ${locationInfo} ${customMessage} ${instructions}`.trim()
}

// Data processing utilities
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Array utilities
export const sortByPriority = (items, priorityKey = 'priority') => {
  return [...items].sort((a, b) => a[priorityKey] - b[priorityKey])
}

export const groupByDate = (items, dateKey = 'date') => {
  return items.reduce((groups, item) => {
    const date = formatDate(item[dateKey])
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {})
}

// Browser utilities
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'
      document.body.prepend(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      return true
    }
  } catch (error) {
    console.error('Copy to clipboard failed:', error)
    return false
  }
}

export const shareContent = async (shareData) => {
  try {
    if (navigator.share) {
      await navigator.share(shareData)
      return true
    } else {
      // Fallback: copy to clipboard
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url || ''}`
      return await copyToClipboard(text)
    }
  } catch (error) {
    console.error('Share failed:', error)
    return false
  }
}

// Accessibility utilities
export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}