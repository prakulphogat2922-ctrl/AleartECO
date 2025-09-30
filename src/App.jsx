import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Alerts from './pages/Alerts'
import Emergency from './pages/Emergency'
import Community from './pages/Community'
import Education from './pages/Education'
import Profile from './pages/Profile'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { LocationProvider } from './hooks/useLocation.jsx'
import { NotificationProvider } from './hooks/useNotifications.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/alerts" element={
                  <ProtectedRoute>
                    <Alerts />
                  </ProtectedRoute>
                } />
                <Route path="/emergency" element={
                  <ProtectedRoute>
                    <Emergency />
                  </ProtectedRoute>
                } />
                <Route path="/community" element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } />
                <Route path="/education" element={
                  <ProtectedRoute>
                    <Education />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </LocationProvider>
    </AuthProvider>
  )
}

export default App