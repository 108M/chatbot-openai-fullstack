-- supabase_init.sql
-- SQL setup for Supabase backend based on supabase_architecture.md

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================
-- Tables
-- ==============================

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email varchar(255),
  full_name varchar(255),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255),
  content text,
  status varchar(50) DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255),
  context jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name varchar(255),
  content text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name varchar(255),
  file_path text,
  file_type varchar(100),
  file_size bigint,
  created_at timestamptz DEFAULT now()
);

-- ==============================
-- Indexes
-- ==============================
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_system_prompts_user_id ON system_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);

-- ==============================
-- Row Level Security (RLS)
-- ==============================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT TO public
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE TO public
  USING (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT TO public
  USING (auth.uid() = id);

-- Note: No client DELETE policy for users (admin only)

-- Policies for documents
CREATE POLICY "Users can view their own documents" ON documents
  FOR SELECT TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" ON documents
  FOR INSERT TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" ON documents
  FOR UPDATE TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" ON documents
  FOR DELETE TO public
  USING (auth.uid() = user_id);

-- Policies for sessions
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON sessions
  FOR INSERT TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
  FOR UPDATE TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON sessions
  FOR DELETE TO public
  USING (auth.uid() = user_id);

-- Policies for system_prompts
CREATE POLICY "Users can view their own system prompts" ON system_prompts
  FOR SELECT TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own system prompts" ON system_prompts
  FOR INSERT TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own system prompts" ON system_prompts
  FOR UPDATE TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own system prompts" ON system_prompts
  FOR DELETE TO public
  USING (auth.uid() = user_id);

-- Policies for uploads (no UPDATE from client)
CREATE POLICY "Users can view own uploads" ON uploads
  FOR SELECT TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own uploads" ON uploads
  FOR INSERT TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own uploads" ON uploads
  FOR DELETE TO public
  USING (auth.uid() = user_id);

-- ==============================
-- Triggers: auto-update updated_at timestamp
-- ==============================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_documents_set_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_sessions_set_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_system_prompts_set_updated_at
  BEFORE UPDATE ON system_prompts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- End of file
