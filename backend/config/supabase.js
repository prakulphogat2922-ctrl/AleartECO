const { createClient } = require('@supabase/supabase-js')

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseKey !== 'your_supabase_anon_key'

let supabase = null
let supabaseAdmin = null

if (isSupabaseConfigured) {
  console.log('✅ Supabase configuration found, initializing...')
  
  // Create Supabase client (for general operations)
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false
    }
  })

  // Create admin client (for server-side operations that bypass RLS)
  supabaseAdmin = supabaseServiceKey 
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : supabase
    
  console.log('✅ Supabase clients initialized successfully')
} else {
  console.log('⚠️  Supabase not configured - using fallback mode')
  console.log('   Update .env file with Supabase credentials to enable database features')
}

module.exports = {
  supabase,
  supabaseAdmin,
  isSupabaseConfigured
}