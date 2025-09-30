import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import apiService from '../services/apiService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  // Initialize Google Identity Services
  useEffect(() => {
    const initializeGoogleAuth = () => {
      // Check if Google Identity Services is loaded
      if (typeof window !== 'undefined' && window.google && window.google.accounts) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
        
        if (!clientId || clientId === 'demo_client_id') {
          console.log('Demo mode: Google authentication will use simulated login')
          setLoading(false)
          return
        }

        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          })
          console.log('Google Identity Services initialized successfully')
        } catch (error) {
          console.error('Failed to initialize Google Identity Services:', error)
        }
        setLoading(false)
      } else {
        // Retry after a short delay if Google script hasn't loaded yet
        const retryCount = (window.googleInitRetries || 0) + 1
        window.googleInitRetries = retryCount
        
        if (retryCount < 50) { // Try for 5 seconds
          setTimeout(initializeGoogleAuth, 100)
        } else {
          console.warn('Google Identity Services failed to load after 5 seconds')
          setLoading(false)
        }
      }
    }

    initializeGoogleAuth()

    // Check for existing session
    const savedUser = localStorage.getItem('alearteco_user')
    const savedToken = localStorage.getItem('alearteco_token')
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser)
        apiService.setToken(savedToken)
        
        // Verify token with backend
        apiService.verifyToken()
          .then(() => {
            setUser(userData)
            setIsAuthenticated(true)
          })
          .catch(() => {
            // Token invalid, clear stored data
            localStorage.removeItem('alearteco_user')
            localStorage.removeItem('alearteco_token')
            apiService.setToken(null)
          })
          .finally(() => {
            setLoading(false)
          })
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('alearteco_user')
        localStorage.removeItem('alearteco_token')
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true)
      setError(null)
      
      const decoded = jwtDecode(response.credential)
      const googleUserData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        email_verified: decoded.email_verified
      }

      // Send to backend for processing
      const backendResponse = await apiService.googleAuth({
        googleToken: response.credential,
        userData: googleUserData
      })

      if (backendResponse.success && backendResponse.data.user) {
        const userData = backendResponse.data.user
        setUser(userData)
        setIsAuthenticated(true)
        
        // Save to localStorage for persistence
        localStorage.setItem('alearteco_user', JSON.stringify(userData))
        
        console.log('Google login successful:', userData)
      } else {
        throw new Error(backendResponse.message || 'Google authentication failed')
      }
      
    } catch (error) {
      console.error('Error processing Google response:', error)
      setError(error.message || 'Google authentication failed')
      
      // Fallback to demo login if Google auth fails
      console.log('Falling back to demo login')
      handleDemoLogin()
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo_123456789',
      email: 'demo@alearteco.com',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/96x96/059669/ffffff?text=Demo',
      given_name: 'Demo',
      family_name: 'User',
      email_verified: true,
      loginTime: new Date().toISOString(),
      isDemo: true
    }

    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem('alearteco_user', JSON.stringify(demoUser))
    
    console.log('Demo user logged in successfully')
  }

  const manualLogin = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.login(credentials)
      
      if (response.success && response.data.user) {
        const userData = response.data.user
        setUser(userData)
        setIsAuthenticated(true)
        
        // Save to localStorage for persistence
        localStorage.setItem('alearteco_user', JSON.stringify(userData))
        
        // Show offline mode message if applicable
        if (userData.isOffline) {
          console.log('Offline mode login successful:', userData)
        } else {
          console.log('Online login successful:', userData)
        }
        
        return { success: true, user: userData }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Manual login error:', error)
      
      // Handle offline mode errors gracefully
      if (error.message.includes('OFFLINE_MODE') || error.message.includes('offline')) {
        setError('You are offline. Some features may be limited.')
      } else {
        setError(error.message)
      }
      
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const manualRegister = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.register(userData)
      
      if (response.success && response.data.user) {
        const user = response.data.user
        setUser(user)
        setIsAuthenticated(true)
        
        // Save to localStorage for persistence
        localStorage.setItem('alearteco_user', JSON.stringify(user))
        
        // Show offline mode message if applicable
        if (user.isOffline) {
          console.log('Offline mode registration successful:', user)
        } else {
          console.log('Online registration successful:', user)
        }
        
        return { success: true, user }
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle offline mode errors gracefully
      if (error.message.includes('OFFLINE_MODE') || error.message.includes('offline')) {
        setError('You are offline. Account created locally and will sync when online.')
      } else {
        setError(error.message)
      }
      
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const login = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    
    if (!clientId || clientId === 'demo_client_id') {
      // Demo mode - simulate Google login
      console.log('Demo mode: Using simulated Google login')
      handleDemoLogin()
      return
    }

    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.prompt()
      } catch (error) {
        console.error('Error prompting Google sign-in:', error)
        // Fallback to demo login if Google fails
        handleDemoLogin()
      }
    } else {
      console.warn('Google Identity Services not available, using demo login')
      handleDemoLogin()
    }
  }

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state regardless of API response
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('alearteco_user')
      localStorage.removeItem('alearteco_token')
      
      // Sign out from Google
      if (window.google) {
        window.google.accounts.id.disableAutoSelect()
      }
      
      console.log('User logged out successfully')
    }
  }

  const updateUserProfile = (updatedData) => {
    const newUserData = { ...user, ...updatedData }
    setUser(newUserData)
    localStorage.setItem('alearteco_user', JSON.stringify(newUserData))
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    error,
    login,
    logout,
    updateUserProfile,
    handleGoogleResponse,
    handleDemoLogin,
    manualLogin,
    manualRegister
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}