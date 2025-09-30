// API service for AleartECO backend communication with Supabase integration
import { supabase, isSupabaseConfigured } from '../config/supabase'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('alearteco_token')
    this.useSupabase = isSupabaseConfigured()
  }

  // Set authentication token
  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('alearteco_token', token)
    } else {
      localStorage.removeItem('alearteco_token')
    }
  }

  // Get authentication headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (includeAuth && this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic request method with offline support
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(options.includeAuth !== false),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      
      // Check if it's a network error (offline)
      if (!navigator.onLine || error.name === 'TypeError' || error.message.includes('fetch')) {
        console.log('Detected offline state, using offline mode')
        throw new Error('OFFLINE_MODE')
      }
      
      throw error
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options })
  }

  // POST request
  async post(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
  }

  // PUT request
  async put(endpoint, data = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    })
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options })
  }

  // Authentication endpoints
  async login(credentials) {
    try {
      // Try Supabase first if configured
      if (this.useSupabase) {
        return await this.supabaseAuth(credentials.email, credentials.password, false)
      }
      
      // Fallback to backend API
      const response = await this.post('/auth/login', credentials, { includeAuth: false })
      if (response.success && response.data.token) {
        this.setToken(response.data.token)
      }
      return response
    } catch (error) {
      if (error.message === 'OFFLINE_MODE') {
        // Offline login fallback
        return this.offlineLogin(credentials)
      }
      throw error
    }
  }

  async register(userData) {
    try {
      // Try Supabase first if configured
      if (this.useSupabase) {
        return await this.supabaseAuth(userData.email, userData.password, true, userData)
      }
      
      // Fallback to backend API
      const response = await this.post('/auth/register', userData, { includeAuth: false })
      if (response.success && response.data.token) {
        this.setToken(response.data.token)
      }
      return response
    } catch (error) {
      if (error.message === 'OFFLINE_MODE') {
        // Offline registration fallback
        return this.offlineRegister(userData)
      }
      throw error
    }
  }

  // Offline authentication fallback
  offlineLogin(credentials) {
    console.log('Using offline login mode')
    
    // Check if user exists in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('alearteco_offline_users') || '[]')
    const user = savedUsers.find(u => u.email === credentials.email.toLowerCase().trim())
    
    if (!user) {
      return {
        success: false,
        message: 'No offline account found. Please connect to internet for first-time login.'
      }
    }
    
    // Simple password check (in real app, you'd use proper hashing)
    if (user.password !== credentials.password) {
      return {
        success: false,
        message: 'Invalid password'
      }
    }
    
    // Generate offline token
    const offlineToken = `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.setToken(offlineToken)
    
    // Update last login
    user.lastLogin = new Date().toISOString()
    user.isOffline = true
    
    // Save updated user data
    const updatedUsers = savedUsers.map(u => u.email === user.email ? user : u)
    localStorage.setItem('alearteco_offline_users', JSON.stringify(updatedUsers))
    
    return {
      success: true,
      message: 'Offline login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isOffline: true,
          lastLogin: user.lastLogin
        },
        token: offlineToken
      }
    }
  }

  offlineRegister(userData) {
    console.log('Using offline registration mode')
    
    // Get existing users
    const savedUsers = JSON.parse(localStorage.getItem('alearteco_offline_users') || '[]')
    
    // Check if email already exists
    if (savedUsers.find(u => u.email === userData.email.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Email already registered. Try logging in instead.'
      }
    }
    
    // Create offline user
    const newUser = {
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password, // In real app, hash this
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isOffline: true,
      loginProvider: 'manual'
    }
    
    // Save to localStorage
    savedUsers.push(newUser)
    localStorage.setItem('alearteco_offline_users', JSON.stringify(savedUsers))
    
    // Generate offline token
    const offlineToken = `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.setToken(offlineToken)
    
    return {
      success: true,
      message: 'Offline registration successful',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isOffline: true,
          createdAt: newUser.createdAt
        },
        token: offlineToken
      }
    }
  }

  async googleAuth(googleData) {
    const response = await this.post('/auth/google', googleData, { includeAuth: false })
    if (response.success && response.data.token) {
      this.setToken(response.data.token)
    }
    return response
  }

  async logout() {
    try {
      await this.post('/auth/logout')
    } finally {
      this.setToken(null)
    }
  }

  async getCurrentUser() {
    return this.get('/auth/me')
  }

  async verifyToken() {
    try {
      // Check if it's an offline token
      if (this.token && this.token.startsWith('offline_')) {
        console.log('Verifying offline token')
        
        // Get current user from localStorage
        const savedUser = localStorage.getItem('alearteco_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          return {
            success: true,
            message: 'Offline token verified',
            data: {
              user: userData
            }
          }
        } else {
          throw new Error('No offline user data found')
        }
      }
      
      // Online token verification
      return this.post('/auth/verify-token')
    } catch (error) {
      if (error.message === 'OFFLINE_MODE') {
        console.log('Cannot verify token offline, assuming valid')
        const savedUser = localStorage.getItem('alearteco_user')
        if (savedUser) {
          return {
            success: true,
            message: 'Offline mode - using cached user',
            data: {
              user: JSON.parse(savedUser)
            }
          }
        }
      }
      throw error
    }
  }

  // User endpoints
  async getUserProfile() {
    return this.get('/users/profile')
  }

  async updateUserProfile(profileData) {
    return this.put('/users/profile', profileData)
  }

  async deleteAccount() {
    const response = await this.delete('/users/account')
    this.setToken(null)
    return response
  }

  async getUserStats() {
    return this.get('/users/stats')
  }

  // Health check with Supabase support
  async healthCheck() {
    if (this.useSupabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('count', { count: 'exact', head: true })
        
        if (error) throw error
        
        return {
          status: 'OK',
          message: 'Supabase connection healthy',
          timestamp: new Date().toISOString(),
          database: 'supabase'
        }
      } catch (error) {
        console.error('Supabase health check failed:', error)
        return {
          status: 'ERROR',
          message: 'Supabase connection failed',
          error: error.message
        }
      }
    }
    
    return this.get('/health', { includeAuth: false })
  }

  // Enhanced authentication with Supabase support
  async supabaseAuth(email, password, isRegistration = false, additionalData = {}) {
    if (!this.useSupabase) {
      throw new Error('Supabase not configured')
    }

    try {
      if (isRegistration) {
        // Register with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: additionalData.name,
              login_provider: 'manual'
            }
          }
        })

        if (error) throw error

        // Also create user in our custom users table
        if (data.user) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email,
              name: additionalData.name,
              login_provider: 'manual',
              is_verified: data.user.email_confirmed_at ? true : false,
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString()
            })

          if (insertError) {
            console.error('Error creating user profile:', insertError)
          }
        }

        return {
          success: true,
          message: 'Registration successful',
          data: {
            user: {
              id: data.user.id,
              email: data.user.email,
              name: additionalData.name,
              isVerified: data.user.email_confirmed_at ? true : false,
              loginProvider: 'manual'
            },
            token: data.session?.access_token
          }
        }
      } else {
        // Login with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        // Update last login in our custom table
        if (data.user) {
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', data.user.id)
        }

        // Get user profile from our custom table
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        return {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: data.user.id,
              email: data.user.email,
              name: userProfile?.name || data.user.user_metadata?.name,
              isVerified: data.user.email_confirmed_at ? true : false,
              loginProvider: userProfile?.login_provider || 'manual',
              lastLogin: userProfile?.last_login
            },
            token: data.session?.access_token
          }
        }
      }
    } catch (error) {
      console.error('Supabase auth error:', error)
      throw new Error(error.message || 'Authentication failed')
    }
  }
}

// Create singleton instance
const apiService = new ApiService()

export default apiService