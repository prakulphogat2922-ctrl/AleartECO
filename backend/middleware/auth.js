const { verifyToken, extractTokenFromHeader } = require('../utils/jwt')
const User = require('../models/User')

const authenticateToken = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization)
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization)
    
    if (token) {
      const decoded = verifyToken(token)
      const user = await User.findById(decoded.userId)
      if (user) {
        req.user = user
      }
    }
    
    next()
  } catch (error) {
    // Continue without authentication if token is invalid
    next()
  }
}

module.exports = {
  authenticateToken,
  optionalAuth
}