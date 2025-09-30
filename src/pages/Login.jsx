import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
  WifiOff
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingSpinner from '../components/LoadingSpinner'
import GoogleSignInButton from '../components/GoogleSignInButton'

const Login = () => {
  const { user, loading, isAuthenticated, login, handleDemoLogin, manualLogin, manualRegister, error } = useAuth()
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [googleError, setGoogleError] = useState('')
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    isRegistering: false
  })
  const [showPassword, setShowPassword] = useState(false)

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      console.log('App is now online')
    }
    
    const handleOffline = () => {
      setIsOffline(true)
      console.log('App is now offline')
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />
  }

  const handleManualSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError('')
    
    try {
      // Client-side validation
      if (formData.isRegistering) {
        if (!formData.name.trim()) {
          setFormError('Name is required')
          return
        }
        if (formData.name.trim().length < 2) {
          setFormError('Name must be at least 2 characters long')
          return
        }
        if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
          setFormError('Name can only contain letters and spaces')
          return
        }
      }
      
      if (!formData.email.trim()) {
        setFormError('Email is required')
        return
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        setFormError('Please enter a valid email address')
        return
      }
      
      if (!formData.password) {
        setFormError('Password is required')
        return
      }
      
      if (formData.isRegistering) {
        if (formData.password.length < 8) {
          setFormError('Password must be at least 8 characters long')
          return
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          setFormError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
          return
        }
      }
      
      let result
      
      if (formData.isRegistering) {
        // Registration
        result = await manualRegister({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        })
      } else {
        // Login
        result = await manualLogin({
          email: formData.email.trim(),
          password: formData.password
        })
      }
      
      if (!result.success) {
        setFormError(result.error || 'Authentication failed')
      }
      // If successful, the auth context will handle the redirect
      
    } catch (error) {
      console.error('Form submission error:', error)
      setFormError(error.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear errors when user starts typing
    if (formError) {
      setFormError('')
    }
  }

  const toggleMode = () => {
    setFormData({
      email: formData.email, // Keep email when switching modes
      password: '',
      name: '',
      isRegistering: !formData.isRegistering
    })
    // Clear any existing errors
    setFormError('')
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      isRegistering: false
    })
    setFormError('')
    setShowManualLogin(false)
  }

  if (loading) {
    return <LoadingSpinner size="large" message="Initializing authentication..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to AleartECO
          </h1>
          <p className="text-gray-600">
            Join the community working together for climate safety and emergency preparedness
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Offline Indicator */}
          {isOffline && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <WifiOff className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="text-sm font-medium text-orange-800">Offline Mode</h3>
                  <p className="text-sm text-orange-700">
                    You're offline. You can still access your account if you've logged in before.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Google Sign-In */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sign in to get started
              </h2>
              
              {/* Display Google auth error if any */}
              {googleError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{googleError}</p>
                </div>
              )}
              
              {/* Google Sign-In Button Component */}
              <GoogleSignInButton onError={setGoogleError} />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Manual Login Option */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowManualLogin(!showManualLogin)
                  if (!showManualLogin) {
                    // Reset form when opening
                    setFormError('')
                  }
                }}
                className={`inline-flex items-center justify-center space-x-2 px-4 py-2 border border-primary-300 rounded-md text-primary-600 hover:text-primary-700 hover:bg-primary-50 font-medium transition-colors ${
                  showManualLogin ? 'bg-primary-50' : ''
                }`}
              >
                <span>Continue with email</span>
                <ArrowRight className={`h-4 w-4 transition-transform ${
                  showManualLogin ? 'rotate-90' : ''
                }`} />
              </button>
              
              {showManualLogin && (
                <div className="mt-2">
                  <button
                    onClick={resetForm}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Manual Login Form */}
            {showManualLogin && (
              <div className="border-t border-gray-200 pt-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {formData.isRegistering ? 'Create your account' : 'Sign in with email'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.isRegistering 
                      ? 'Join the AleartECO community' 
                      : isOffline 
                        ? 'Works offline if you\'ve signed in before'
                        : 'Access your AleartECO account'
                    }
                  </p>
                </div>
                
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  {/* Error Display */}
                  {(formError || error) && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-700">{formError || error}</p>
                    </div>
                  )}
                  
                  {/* Success message for offline mode */}
                  {isOffline && !formError && !error && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-700">
                        🌐 Offline mode active. Your data will sync when you're back online.
                      </p>
                    </div>
                  )}
                  
                  {formData.isRegistering && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 transition-colors"
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 transition-colors"
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 transition-colors"
                        placeholder={formData.isRegistering ? "Choose a strong password" : "Enter your password"}
                        minLength={formData.isRegistering ? 8 : undefined}
                        autoComplete={formData.isRegistering ? "new-password" : "current-password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {formData.isRegistering && (
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters with uppercase letter, lowercase letter, and number
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || (!formData.email.trim() || !formData.password.trim() || (formData.isRegistering && !formData.name.trim()))}
                    className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{formData.isRegistering ? 'Creating account...' : 'Signing in...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{formData.isRegistering ? 'Create Account' : 'Sign In'}</span>
                        {isOffline && <span className="text-xs">(Offline)</span>}
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={toggleMode}
                      disabled={isSubmitting}
                      className="text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50 underline transition-colors"
                    >
                      {formData.isRegistering 
                        ? 'Already have an account? Sign in'
                        : "Don't have an account? Sign up"
                      }
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: 'Secure', desc: 'Your data is protected' },
            { icon: Globe, title: 'Global', desc: 'Worldwide coverage' },
            { icon: Users, title: 'Community', desc: 'Join thousands of users' }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center text-white">
                <Icon className="h-6 w-6 mx-auto mb-2 opacity-80" />
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm opacity-70">{feature.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Terms */}
        <div className="mt-8 text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
        </div>
      </div>
    </div>
  )
}

export default Login