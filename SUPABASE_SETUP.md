# Supabase Setup Guide for AleartECO

## 🚀 Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization/project
4. Note down your project URL and API keys

### 2. Setup Database Schema
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Copy and paste the contents of `backend/database/schema.sql`
4. Run the SQL to create all necessary tables

### 3. Configure Environment Variables

#### Backend (.env file)
```env
# Replace with your actual Supabase credentials
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

#### Frontend (.env file)
```env
# Replace with your actual Supabase credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Find Your Supabase Credentials

#### Project URL:
- Format: `https://your-project-id.supabase.co`
- Found in: Project Settings > General > Reference ID

#### API Keys:
1. Go to Project Settings > API
2. **anon public key**: Use for frontend (VITE_SUPABASE_ANON_KEY)
3. **service_role key**: Use for backend (SUPABASE_SERVICE_KEY) - Keep this secret!

### 5. Configure Row Level Security (RLS)
The schema already includes RLS policies, but you may need to:
1. Go to Authentication > Policies
2. Verify policies are active for all tables
3. Adjust policies if needed

### 6. Test the Connection
1. Start your backend: `cd backend && npm run dev`
2. Start your frontend: `npm run dev`
3. Try registering a new user
4. Check the Supabase dashboard to see if data appears

## 🔧 Features Enabled

✅ **User Authentication**: Email/password + Google OAuth
✅ **User Profiles**: Complete user management
✅ **Data Persistence**: All user data stored in Supabase
✅ **Offline Support**: Fallback to local storage when offline
✅ **Education Progress**: Track course completion and scores
✅ **Alert System**: Store and manage emergency alerts
✅ **Settings Management**: User preferences and emergency contacts

## 🛡️ Security Features

- Row Level Security (RLS) enabled
- User data isolation
- Secure API endpoints
- JWT token authentication
- Password hashing with bcrypt

## 📊 Database Tables Created

1. **users** - User accounts and profiles
2. **alerts** - Emergency alerts and notifications
3. **user_settings** - User preferences
4. **emergency_contacts** - Emergency contact information
5. **education_progress** - Course completion tracking

## 🔄 Migration Notes

- Existing local data will be preserved
- Users can continue using the app offline
- Data syncs when Supabase is connected
- Backward compatible with existing features

## 🆘 Troubleshooting

### Common Issues:

1. **Connection Failed**: Check your SUPABASE_URL and keys
2. **CORS Errors**: Add your domain to Supabase Auth settings
3. **RLS Errors**: Verify policies are correctly set up
4. **Missing Tables**: Re-run the schema.sql file

### Support:
- Check Supabase logs in the dashboard
- Review browser console for errors
- Verify environment variables are loaded correctly