#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 AleartECO Supabase Setup Assistant')
console.log('=====================================\n')

// Check if .env files exist
const backendEnvPath = path.join(__dirname, 'backend', '.env')
const frontendEnvPath = path.join(__dirname, '.env')

function checkEnvFile(filePath, type) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${type} .env file exists`)
    
    const content = fs.readFileSync(filePath, 'utf8')
    
    if (type === 'Backend') {
      const hasSupabaseUrl = content.includes('SUPABASE_URL=') && !content.includes('your_supabase_project_url')
      const hasSupabaseKey = content.includes('SUPABASE_ANON_KEY=') && !content.includes('your_supabase_anon_key')
      
      if (hasSupabaseUrl && hasSupabaseKey) {
        console.log(`✅ ${type} Supabase configuration appears complete`)
      } else {
        console.log(`⚠️  ${type} Supabase configuration needs setup`)
        console.log('   Please update your .env file with actual Supabase credentials')
      }
    }
    
    if (type === 'Frontend') {
      const hasSupabaseUrl = content.includes('VITE_SUPABASE_URL=') && !content.includes('your-project-id.supabase.co')
      const hasSupabaseKey = content.includes('VITE_SUPABASE_ANON_KEY=') && !content.includes('your-anon-public-key')
      
      if (hasSupabaseUrl && hasSupabaseKey) {
        console.log(`✅ ${type} Supabase configuration appears complete`)
      } else {
        console.log(`⚠️  ${type} Supabase configuration needs setup`)
        console.log('   Please create .env file using .env.example template')
      }
    }
  } else {
    console.log(`❌ ${type} .env file missing`)
    
    if (type === 'Frontend') {
      console.log('   Creating .env file from template...')
      try {
        const examplePath = path.join(__dirname, '.env.example')
        if (fs.existsSync(examplePath)) {
          fs.copyFileSync(examplePath, filePath)
          console.log('✅ Frontend .env file created from template')
          console.log('   Please update it with your Supabase credentials')
        }
      } catch (error) {
        console.log('   Please create .env file manually using .env.example')
      }
    }
  }
}

console.log('📝 Checking environment configuration...')
checkEnvFile(backendEnvPath, 'Backend')
checkEnvFile(frontendEnvPath, 'Frontend')

console.log('\n🔧 Setup Instructions:')
console.log('1. Create a Supabase project at https://supabase.com')
console.log('2. Run the SQL schema in backend/database/schema.sql')
console.log('3. Update your .env files with Supabase credentials')
console.log('4. Install dependencies: npm install')
console.log('5. Start backend: cd backend && npm run dev')
console.log('6. Start frontend: npm run dev')

console.log('\n📚 For detailed instructions, see SUPABASE_SETUP.md')

console.log('\n🆘 Need help? Check the troubleshooting section in SUPABASE_SETUP.md')

// Check if Supabase packages are installed
const backendPackageJson = path.join(__dirname, 'backend', 'package.json')
const frontendPackageJson = path.join(__dirname, 'package.json')

function checkSupabaseDependency(packagePath, type) {
  if (fs.existsSync(packagePath)) {
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    const hasSupabase = packageData.dependencies && packageData.dependencies['@supabase/supabase-js']
    
    if (hasSupabase) {
      console.log(`✅ ${type} Supabase package installed`)
    } else {
      console.log(`⚠️  ${type} missing Supabase package`)
      console.log(`   Run: ${type === 'Backend' ? 'cd backend && ' : ''}npm install @supabase/supabase-js`)
    }
  }
}

console.log('\n📦 Checking dependencies...')
checkSupabaseDependency(backendPackageJson, 'Backend')
checkSupabaseDependency(frontendPackageJson, 'Frontend')