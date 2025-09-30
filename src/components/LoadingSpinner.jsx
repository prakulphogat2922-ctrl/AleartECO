import React from 'react'

const LoadingSpinner = ({ size = 'medium', className = '', message = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}

export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner size="large" message={message} />
    </div>
  )
}

export const LoadingCard = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      <LoadingSpinner size="medium" message={message} />
    </div>
  )
}

export default LoadingSpinner