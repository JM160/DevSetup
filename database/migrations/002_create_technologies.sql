CREATE TABLE IF NOT EXISTS technologies (
  id VARCHAR(50) PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  official_url VARCHAR(255),
  installation_script TEXT NOT NULL,
  verification_command VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);