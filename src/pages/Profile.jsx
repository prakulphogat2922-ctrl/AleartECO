import React, { useState } from 'react'
import { 
  User, 
  MapPin, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Sun,
  Settings,
  Edit3,
  Save,
  X
} from 'lucide-react'
import { useLocation } from '../hooks/useLocation.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

const Profile = () => {
  const { location, hasLocation, getCurrentLocation } = useLocation()
  const { user, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@email.com',
    phone: user?.phone || '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2024',
    emergencyContacts: 2,
    alertsReceived: 23,
    communityPosts: 5
  })

  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    communityUpdates: true,
    locationTracking: true,
    theme: 'light',
    language: 'English'
  })

  const [editForm, setEditForm] = useState({ ...userProfile })

  const handleSaveProfile = () => {
    setUserProfile(editForm)
    updateUserProfile(editForm)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm(userProfile)
    setIsEditing(false)
  }

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile & Settings</h1>
          <p className="text-gray-600">
            Manage your account information, preferences, and privacy settings
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Google Account Info */}
          {user && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-900 mb-3">Google Account Information</h3>
              <div className="flex items-center space-x-4">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-16 w-16 rounded-full border-2 border-blue-200"
                  />
                )}
                <div>
                  <p className="font-medium text-blue-900">{user.name}</p>
                  <p className="text-sm text-blue-700">{user.email}</p>
                  <p className="text-xs text-blue-600">
                    Verified: {user.email_verified ? '✓' : '✗'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{userProfile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{userProfile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{userProfile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="flex-1 text-gray-900">{userProfile.location}</p>
                )}
                <button
                  onClick={getCurrentLocation}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{userProfile.alertsReceived}</div>
              <div className="text-gray-600">Alerts Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{userProfile.communityPosts}</div>
              <div className="text-gray-600">Community Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{userProfile.emergencyContacts}</div>
              <div className="text-gray-600">Emergency Contacts</div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Alerts</h3>
                <p className="text-sm text-gray-600">Receive climate alerts via email</p>
              </div>
              <button
                onClick={() => togglePreference('emailAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.emailAlerts ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">Instant alerts on your device</p>
              </div>
              <button
                onClick={() => togglePreference('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                <p className="text-sm text-gray-600">Critical alerts via text message</p>
              </div>
              <button
                onClick={() => togglePreference('smsAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.smsAlerts ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Community Updates</h3>
                <p className="text-sm text-gray-600">Updates from your local community</p>
              </div>
              <button
                onClick={() => togglePreference('communityUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.communityUpdates ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.communityUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Location Tracking</h3>
                <p className="text-sm text-gray-600">Allow precise location for personalized alerts</p>
              </div>
              <button
                onClick={() => togglePreference('locationTracking')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.locationTracking ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.locationTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Data Management</h3>
              <div className="space-y-2">
                <button className="text-primary-600 hover:text-primary-700 text-sm">
                  Download your data
                </button>
                <br />
                <button className="text-danger-600 hover:text-danger-700 text-sm">
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>App Preferences</span>
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setPreferences({...preferences, theme: 'light'})}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                    preferences.theme === 'light'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setPreferences({...preferences, theme: 'dark'})}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                    preferences.theme === 'dark'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Chinese">中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile