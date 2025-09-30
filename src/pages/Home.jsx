import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  AlertTriangle, 
  Phone, 
  Users, 
  BookOpen, 
  MapPin,
  Shield,
  Globe,
  Zap
} from 'lucide-react'
import { useLocation } from '../hooks/useLocation'
import { useNotifications } from '../hooks/useNotifications.jsx'
import WeatherWidget from '../components/WeatherWidget'

const Home = () => {
  const { location, loading: locationLoading, error: locationError } = useLocation()
  const { showNotification, requestPermission, hasPermission } = useNotifications()

  useEffect(() => {
    // Request notification permission on first visit
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  const features = [
    {
      icon: AlertTriangle,
      title: 'Real-time Alerts',
      description: 'Get personalized climate alerts based on your exact location',
      link: '/alerts',
      color: 'text-danger-600'
    },
    {
      icon: Phone,
      title: 'Emergency SOS',
      description: 'Quick access to emergency contacts and local services',
      link: '/emergency',
      color: 'text-danger-600'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with others and share local climate information',
      link: '/community',
      color: 'text-primary-600'
    },
    {
      icon: BookOpen,
      title: 'Learn & Prepare',
      description: 'Educational resources and interactive preparedness guides',
      link: '/education',
      color: 'text-primary-600'
    }
  ]

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Alerts Sent', value: '2.3M', icon: AlertTriangle },
    { label: 'Lives Protected', value: '125K', icon: Shield },
    { label: 'Countries Covered', value: '45', icon: Globe }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay Safe with{' '}
              <span className="text-primary-600">Climate Alerts</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized, location-based climate alerts and emergency preparedness 
              tools to protect yourself and your community from environmental threats.
            </p>
            
            {/* Location Status */}
            <div className="flex items-center justify-center mb-8">
              {locationLoading ? (
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  <span>Getting your location...</span>
                </div>
              ) : location ? (
                <div className="flex items-center space-x-2 text-primary-600">
                  <MapPin className="h-5 w-5" />
                  <span>Protected at your location</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-warning-600">
                  <MapPin className="h-5 w-5" />
                  <span>Enable location for personalized alerts</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/alerts"
                className="btn-primary px-8 py-3 text-lg"
              >
                View Active Alerts
              </Link>
              <Link
                to="/emergency"
                className="btn-secondary px-8 py-3 text-lg"
              >
                Emergency Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Quick Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather Widget */}
            <div className="lg:col-span-1">
              <WeatherWidget />
            </div>
            
            {/* Quick Stats */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Safe</div>
                    <div className="text-sm text-gray-600">Current Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">3</div>
                    <div className="text-sm text-gray-600">Active Alerts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-sm text-gray-600">Watch Areas</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/alerts" className="btn-primary w-full">
                    View All Alerts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Climate Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay informed, prepared, and connected during climate events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-300"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gray-50 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-primary-500 text-white mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-100">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Stay Protected?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust AleartECO to keep them safe and informed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/alerts"
              className="btn-primary px-8 py-3 text-lg flex items-center justify-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>Get Started Now</span>
            </Link>
            <Link
              to="/education"
              className="btn-secondary px-8 py-3 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home