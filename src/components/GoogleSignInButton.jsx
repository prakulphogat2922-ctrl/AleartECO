import React, { useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

const GoogleSignInButton = ({ onError }) => {
  const { handleGoogleResponse, handleDemoLogin } = useAuth()
  const buttonRef = useRef(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    const initializeGoogleButton = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      
      if (!clientId || clientId === 'demo_client_id') {
        setIsLoaded(true)
        return
      }

      if (window.google && window.google.accounts && buttonRef.current) {
        try {
          buttonRef.current.innerHTML = ''
          
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          })

          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: 'outline',
            size: 'large',
            width: 300,
            text: 'signin_with',
            shape: 'rectangular'
          })
          
          setIsLoaded(true)
          console.log('Google Sign-In button initialized successfully')
        } catch (error) {
          console.error('Failed to initialize Google Sign-In button:', error)
          onError?.(error.message)
          setIsLoaded(true)
        }
      } else {
        const retryCount = (window.googleButtonRetries || 0) + 1
        window.googleButtonRetries = retryCount
        
        if (retryCount < 50) {
          setTimeout(initializeGoogleButton, 100)
        } else {
          console.warn('Google Identity Services failed to load')
          setIsLoaded(true)
        }
      }
    }

    initializeGoogleButton()
  }, [handleGoogleResponse, onError])

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId || clientId === 'demo_client_id') {
    return (
      <div className="w-full">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Demo Mode:</strong> Google authentication is simulated for testing
          </p>
        </div>
        
        <button
          onClick={handleDemoLogin}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Sign in with Google (Demo)</span>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {!isLoaded && (
        <div className="flex items-center justify-center py-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading Google Sign-In...</span>
        </div>
      )}
      
      <div 
        ref={buttonRef}
        className={`flex justify-center ${!isLoaded ? 'hidden' : ''}`}
      />
      
      {isLoaded && (
        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 bg-primary-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-3"
        >
          <span>Continue with Google (Fallback)</span>
        </button>
      )}
    </div>
  )
}

export default GoogleSignInButton