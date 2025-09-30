import React, { useState } from 'react'
import { 
  Phone, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2,
  Shield
} from 'lucide-react'
import { useLocation } from '../hooks/useLocation.jsx'
import { useNotifications } from '../hooks/useNotifications.jsx'

const Emergency = () => {
  const { location, hasLocation } = useLocation()
  const { showNotification } = useNotifications()
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      isPrimary: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      relationship: 'Emergency Contact',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@email.com',
      isPrimary: false
    }
  ])
  
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  })

  const localEmergencyServices = [
    {
      service: 'Emergency Services',
      phone: '911',
      description: 'Police, Fire, Medical Emergency'
    },
    {
      service: 'Local Emergency Management',
      phone: '+1 (555) 311-0000',
      description: 'Disaster coordination and information'
    },
    {
      service: 'Red Cross Local Chapter',
      phone: '+1 (555) 733-2767',
      description: 'Disaster relief and shelter'
    },
    {
      service: 'Poison Control',
      phone: '+1 (800) 222-1222',
      description: '24/7 poison emergency helpline'
    }
  ]

  const handleSOSAlert = () => {
    const message = `EMERGENCY ALERT: I need immediate assistance. My current location is ${
      hasLocation 
        ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}` 
        : 'unknown - please call me'
    }. Please contact me immediately or send help.`

    // Show confirmation
    showNotification('SOS Alert Sent', {
      body: `Emergency message sent to ${emergencyContacts.length} contacts`,
      tag: 'sos-alert'
    })

    // In a real app, this would send SMS/emails to emergency contacts
    console.log('SOS Alert:', message)
    alert('SOS Alert sent to your emergency contacts!')
  }

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now(),
        ...newContact,
        isPrimary: emergencyContacts.length === 0
      }
      setEmergencyContacts([...emergencyContacts, contact])
      setNewContact({ name: '', relationship: '', phone: '', email: '' })
      setShowAddContact(false)
    }
  }

  const handleDeleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Center</h1>
          <p className="text-gray-600">
            Quick access to emergency contacts and services. Your safety is our priority.
          </p>
        </div>

        {/* SOS Button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency SOS</h2>
            <p className="text-gray-600 mb-6">
              Press the button below to immediately alert your emergency contacts with your location
            </p>
            <button
              onClick={handleSOSAlert}
              className="bg-danger-600 hover:bg-danger-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>SEND SOS ALERT</span>
              </div>
            </button>
            <p className="text-sm text-gray-500 mt-4">
              {hasLocation ? 
                'Your exact location will be shared' : 
                'Enable location services for precise location sharing'
              }
            </p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </h2>
            <button
              onClick={() => setShowAddContact(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Contact</span>
            </button>
          </div>

          {/* Add Contact Form */}
          {showAddContact && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Add New Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex space-x-3 mt-4">
                <button onClick={handleAddContact} className="btn-primary">
                  Add Contact
                </button>
                <button 
                  onClick={() => setShowAddContact(false)} 
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contacts List */}
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    contact.isPrimary ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                      <span>{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Emergency Services */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Local Emergency Services</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localEmergencyServices.map((service, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{service.service}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <a
                  href={`tel:${service.phone}`}
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Phone className="h-4 w-4" />
                  <span>{service.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-primary-50 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Emergency Preparedness Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Keep your emergency contacts updated and easily accessible</li>
            <li>• Ensure your phone is charged and consider a portable charger</li>
            <li>• Know your evacuation routes and meeting points</li>
            <li>• Keep emergency supplies (water, food, flashlight, first aid) ready</li>
            <li>• Stay informed through official emergency broadcasts and alerts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Emergency