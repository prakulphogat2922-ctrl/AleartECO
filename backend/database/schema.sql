-- AleartECO Supabase Database Schema

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'alearteco_super_secret_jwt_key_change_in_production';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT, -- For manual login users
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT FALSE,
    login_provider TEXT DEFAULT 'manual', -- 'manual' or 'google'
    profile JSONB DEFAULT '{}',
    last_login TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_login_provider ON users(login_provider);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Create alerts table for future use
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    location JSONB, -- {lat, lng, address}
    alert_type TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Create indexes for alerts
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    notification_email BOOLEAN DEFAULT TRUE,
    notification_push BOOLEAN DEFAULT TRUE,
    location_sharing BOOLEAN DEFAULT FALSE,
    emergency_contacts JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    relationship TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create education_progress table
CREATE TABLE IF NOT EXISTS education_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    quiz_scores JSONB DEFAULT '{}',
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create indexes for education_progress
CREATE INDEX IF NOT EXISTS idx_education_progress_user_id ON education_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_education_progress_course_id ON education_progress(course_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::TEXT = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::TEXT = id);

-- RLS Policies for alerts table
CREATE POLICY "Users can view their own alerts" ON alerts
    FOR SELECT USING (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can create alerts" ON alerts
    FOR INSERT WITH CHECK (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can update their own alerts" ON alerts
    FOR UPDATE USING (auth.uid()::TEXT = user_id);

-- RLS Policies for user_settings table
CREATE POLICY "Users can view their own settings" ON user_settings
    FOR SELECT USING (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can update their own settings" ON user_settings
    FOR ALL USING (auth.uid()::TEXT = user_id);

-- RLS Policies for emergency_contacts table
CREATE POLICY "Users can manage their own emergency contacts" ON emergency_contacts
    FOR ALL USING (auth.uid()::TEXT = user_id);

-- RLS Policies for education_progress table
CREATE POLICY "Users can view their own education progress" ON education_progress
    FOR SELECT USING (auth.uid()::TEXT = user_id);

CREATE POLICY "Users can update their own education progress" ON education_progress
    FOR ALL USING (auth.uid()::TEXT = user_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_progress_updated_at BEFORE UPDATE ON education_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
-- INSERT INTO users (id, email, name, is_verified, login_provider) VALUES
-- ('demo_user_123', 'demo@alearteco.com', 'Demo User', TRUE, 'manual');