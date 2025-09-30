import React, { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, Clock, Info, AlertCircle } from 'lucide-react'
import { useLocation } from '../hooks/useLocation.jsx'
import { useNotifications } from '../hooks/useNotifications.jsx'

const Alerts = () => {
  const { location, hasLocation } = useLocation()
  const { showNotification } = useNotifications()
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock alert data - In real app, this would come from weather APIs
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Severe Thunderstorm Warning',
      description: 'Severe thunderstorms with large hail and damaging winds expected in your area.',
      location: 'Your Location',
      severity: 'Critical',
      timeIssued: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      instructions: [
        'Seek shelter immediately in a sturdy building',
        'Stay away from windows and doors',
        'Avoid using electrical devices',
        'Do not go outside until the storm passes'
      ]
    },
    {
      id: 2,
      type: 'warning',
      title: 'Heat Advisory',
      description: 'Dangerously hot conditions with heat index values up to 105°F expected.',
      location: 'Regional Area',
      severity: 'Moderate',
      timeIssued: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      instructions: [
        'Stay indoors during peak heat hours (10 AM - 6 PM)',
        'Drink plenty of water',
        'Wear light-colored, loose-fitting clothing',
        'Check on elderly neighbors and relatives'
      ]
    },
    {
      id: 3,
      type: 'info',
      title: 'Air Quality Alert',
      description: 'Unhealthy air quality due to wildfire smoke. Sensitive groups should limit outdoor activities.',
      location: 'Your Area',
      severity: 'Low',
      timeIssued: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
      instructions: [
        'Limit outdoor activities, especially for children and elderly',
        'Keep windows and doors closed',
        'Use air purifiers if available',
        'Consider wearing N95 masks outdoors'
      ]
    }
  ]

  useEffect(() => {
    // Simulate loading alerts
    setTimeout(() => {
      setAlerts(mockAlerts)
      setLoading(false)
    }, 1000)
  }, [])

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-6 w-6 text-danger-600" />
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-warning-600" />
      default:
        return <Info className="h-6 w-6 text-primary-600" />
    }
  }

  const getAlertClass = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-card alert-critical'
      case 'warning':
        return 'alert-card alert-warning'
      default:
        return 'alert-card alert-info'
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatRelativeTime = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading alerts for your area...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Active Alerts</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>
                {hasLocation ? 'Personalized for your location' : 'General alerts - Enable location for personalized alerts'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatTime(new Date())}</span>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.length === 0 ? (
            <div className="text-center py-20">
              <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Active Alerts</h3>
              <p className="text-gray-500">Your area is currently safe from climate threats.</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className={getAlertClass(alert.type)}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.type === 'critical' ? 'bg-danger-100 text-danger-700' :
                        alert.type === 'warning' ? 'bg-warning-100 text-warning-700' :
                        'bg-primary-100 text-primary-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{alert.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Location:</strong> {alert.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Issued:</strong> {formatRelativeTime(alert.timeIssued)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Expires:</strong> {formatTime(alert.expiresAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Actions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {alert.instructions.map((instruction, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            {instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alert Settings */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive instant alerts on your device</p>
              </div>
              <button className="btn-primary">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Location Tracking</p>
                <p className="text-sm text-gray-600">Get personalized alerts for your area</p>
              </div>
              <button className="btn-secondary">
                {hasLocation ? 'Enabled' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alerts