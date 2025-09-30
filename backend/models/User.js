const bcrypt = require('bcryptjs')
const { supabaseAdmin, isSupabaseConfigured } = require('../config/supabase')

// Fallback to file system when Supabase is not configured
const fs = require('fs').promises
const path = require('path')

class User {
  constructor(userData) {
    this.id = userData.id || this.generateId()
    this.email = userData.email
    this.name = userData.name
    this.password = userData.password
    this.created_at = userData.created_at || new Date().toISOString()
    this.updated_at = userData.updated_at || new Date().toISOString()
    this.is_verified = userData.is_verified || false
    this.login_provider = userData.login_provider || 'manual' // 'manual' or 'google'
    this.profile = userData.profile || {}
    this.last_login = userData.last_login
  }

  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  async hashPassword() {
    if (this.password && !this.password.startsWith('$2a$')) {
      const salt = await bcrypt.genSalt(12)
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  async comparePassword(candidatePassword) {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this
    return {
      ...userWithoutPassword,
      createdAt: userWithoutPassword.created_at,
      updatedAt: userWithoutPassword.updated_at,
      isVerified: userWithoutPassword.is_verified,
      loginProvider: userWithoutPassword.login_provider,
      lastLogin: userWithoutPassword.last_login
    }
  }

  static async findByEmail(email) {
    if (!isSupabaseConfigured) {
      return this.findByEmailFallback(email)
    }
    
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null // User not found
        }
        throw error
      }
      
      return data ? new User(data) : null
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw new Error('Database query failed')
    }
  }

  static async findById(id) {
    if (!isSupabaseConfigured) {
      return this.findByIdFallback(id)
    }
    
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null // User not found
        }
        throw error
      }
      
      return data ? new User(data) : null
    } catch (error) {
      console.error('Error finding user by ID:', error)
      throw new Error('Database query failed')
    }
  }

  static async create(userData) {
    if (!isSupabaseConfigured) {
      return this.createFallback(userData)
    }
    
    try {
      // Check if user already exists
      const existingUser = await this.findByEmail(userData.email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      const user = new User(userData)
      await user.hashPassword()
      
      const userForDB = {
        id: user.id,
        email: user.email.toLowerCase(),
        name: user.name,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
        is_verified: user.is_verified,
        login_provider: user.login_provider,
        profile: user.profile,
        last_login: new Date().toISOString()
      }
      
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert([userForDB])
        .select()
        .single()
      
      if (error) {
        console.error('Supabase insert error:', error)
        throw new Error('Failed to create user')
      }
      
      return new User(data)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async save() {
    if (!isSupabaseConfigured) {
      return this.saveFallback()
    }
    
    try {
      this.updated_at = new Date().toISOString()
      
      const userForDB = {
        email: this.email.toLowerCase(),
        name: this.name,
        password: this.password,
        updated_at: this.updated_at,
        is_verified: this.is_verified,
        login_provider: this.login_provider,
        profile: this.profile,
        last_login: this.last_login || new Date().toISOString()
      }
      
      const { data, error } = await supabaseAdmin
        .from('users')
        .update(userForDB)
        .eq('id', this.id)
        .select()
        .single()
      
      if (error) {
        console.error('Supabase update error:', error)
        throw new Error('Failed to update user')
      }
      
      return new User(data)
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  }

  static async getAllUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw error
      }
      
      return data.map(userData => new User(userData))
    } catch (error) {
      console.error('Error getting all users:', error)
      throw new Error('Database query failed')
    }
  }

  static async deleteById(id) {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw error
      }
      
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Failed to delete user')
    }
  }

  // Method to update last login time
  static async updateLastLogin(userId) {
    if (!isSupabaseConfigured) {
      return this.updateLastLoginFallback(userId)
    }
    
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId)
      
      if (error) {
        console.error('Error updating last login:', error)
      }
    } catch (error) {
      console.error('Error updating last login:', error)
    }
  }

  // Fallback methods for file system storage
  static getDataFilePath() {
    return path.join(__dirname, '..', 'data', 'users.json')
  }

  static async ensureDataDirectory() {
    const dataDir = path.join(__dirname, '..', 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }
  }

  static async loadUsers() {
    await this.ensureDataDirectory()
    const filePath = this.getDataFilePath()
    
    try {
      const data = await fs.readFile(filePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []
      }
      throw error
    }
  }

  static async saveUsers(users) {
    await this.ensureDataDirectory()
    const filePath = this.getDataFilePath()
    await fs.writeFile(filePath, JSON.stringify(users, null, 2))
  }

  static async findByEmailFallback(email) {
    const users = await this.loadUsers()
    const userData = users.find(user => user.email.toLowerCase() === email.toLowerCase())
    return userData ? new User({
      ...userData,
      created_at: userData.createdAt,
      updated_at: userData.updatedAt,
      is_verified: userData.isVerified,
      login_provider: userData.loginProvider,
      last_login: userData.lastLogin
    }) : null
  }

  static async findByIdFallback(id) {
    const users = await this.loadUsers()
    const userData = users.find(user => user.id === id)
    return userData ? new User({
      ...userData,
      created_at: userData.createdAt,
      updated_at: userData.updatedAt,
      is_verified: userData.isVerified,
      login_provider: userData.loginProvider,
      last_login: userData.lastLogin
    }) : null
  }

  static async createFallback(userData) {
    const users = await this.loadUsers()
    
    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase())
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const user = new User(userData)
    await user.hashPassword()
    
    const userForStorage = {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      isVerified: user.is_verified,
      loginProvider: user.login_provider,
      profile: user.profile,
      lastLogin: new Date().toISOString()
    }
    
    users.push(userForStorage)
    await this.saveUsers(users)
    
    return user
  }

  async saveFallback() {
    const users = await User.loadUsers()
    const index = users.findIndex(user => user.id === this.id)
    
    this.updated_at = new Date().toISOString()
    
    const userForStorage = {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      isVerified: this.is_verified,
      loginProvider: this.login_provider,
      profile: this.profile,
      lastLogin: this.last_login
    }
    
    if (index !== -1) {
      users[index] = userForStorage
    } else {
      users.push(userForStorage)
    }
    
    await User.saveUsers(users)
    return this
  }

  static async updateLastLoginFallback(userId) {
    try {
      const users = await this.loadUsers()
      const userIndex = users.findIndex(user => user.id === userId)
      
      if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date().toISOString()
        await this.saveUsers(users)
      }
    } catch (error) {
      console.error('Error updating last login (fallback):', error)
    }
  }
}

module.exports = User