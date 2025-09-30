import React, { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [permission, setPermission] = useState(Notification.permission)

  useEffect(() => {
    // Request notification permission on mount
    if (permission === 'default') {
      requestPermission()
    }
  }, [])

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    }
    return false
  }

  const showNotification = (title, options = {}) => {
    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'alearteco-alert',
      requireInteraction: true,
      ...options
    }

    // Add to internal state
    const notification = {
      id: Date.now(),
      title,
      ...defaultOptions,
      timestamp: new Date()
    }
    
    setNotifications(prev => [notification, ...prev])

    // Show browser notification if permission granted
    if (permission === 'granted') {
      const browserNotification = new Notification(title, defaultOptions)
      
      // Auto close after 5 seconds unless requireInteraction is true
      if (!defaultOptions.requireInteraction) {
        setTimeout(() => {
          browserNotification.close()
        }, 5000)
      }

      return browserNotification
    }

    return notification
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const value = {
    notifications,
    permission,
    requestPermission,
    showNotification,
    removeNotification,
    clearAllNotifications,
    hasPermission: permission === 'granted'
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}