import React, { useState } from 'react'
import { 
  Users, 
  MessageCircle, 
  MapPin, 
  AlertTriangle, 
  ThumbsUp, 
  Eye,
  Send,
  Plus
} from 'lucide-react'

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      location: 'Downtown Area',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      content: 'Flooding reported on Main Street near the bridge. Water level is about 2 feet. Avoid this area if possible.',
      type: 'alert',
      likes: 12,
      views: 45,
      verified: true
    },
    {
      id: 2,
      author: 'Mike Chen',
      location: 'Riverside District',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      content: 'Power outage in our neighborhood since 2 hours. Anyone know when it might be restored? Electric company trucks seen on Oak Avenue.',
      type: 'question',
      likes: 8,
      views: 32,
      verified: false
    },
    {
      id: 3,
      author: 'Emergency Management Office',
      location: 'City-wide',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      content: 'Evacuation center has been opened at the Community Center on Elm Street. Hot meals and temporary shelter available. Please bring ID and any medications.',
      type: 'official',
      likes: 34,
      views: 156,
      verified: true
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)

  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours}h ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days}d ago`
    }
  }

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-danger-600" />
      case 'official':
        return <AlertTriangle className="h-4 w-4 text-primary-600" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'alert':
        return 'border-l-danger-500 bg-danger-50'
      case 'official':
        return 'border-l-primary-500 bg-primary-50'
      default:
        return 'border-l-gray-300 bg-white'
    }
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: 'You',
        location: 'Your Location',
        timestamp: new Date(),
        content: newPost,
        type: 'question',
        likes: 0,
        views: 1,
        verified: false
      }
      setPosts([post, ...posts])
      setNewPost('')
      setShowNewPost(false)
    }
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Hub</h1>
          <p className="text-gray-600">
            Share updates, ask questions, and stay connected with your local community during climate events.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">1,234</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">89</div>
            <div className="text-gray-600">Reports Today</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">456</div>
            <div className="text-gray-600">Helped Neighbors</div>
          </div>
        </div>

        {/* New Post Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowNewPost(true)}
            className="btn-primary flex items-center space-x-2 w-full md:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Share an Update</span>
          </button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share with Your Community</h3>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening in your area? Share updates, ask questions, or offer help..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowNewPost(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                className="btn-primary flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className={`rounded-lg shadow-md p-6 border-l-4 ${getPostTypeColor(post.type)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{post.author}</h3>
                      {post.verified && (
                        <div className="w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getPostTypeIcon(post.type)}
                  {post.type === 'official' && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      Official
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Share accurate and helpful information about local conditions</li>
            <li>• Be respectful and supportive of community members</li>
            <li>• Report emergencies to official authorities, not just the community</li>
            <li>• Verify information before sharing to prevent misinformation</li>
            <li>• Help others by sharing resources and offering assistance when possible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Community