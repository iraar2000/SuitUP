CREATE TABLE IF NOT EXISTS credential_verification (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    token_hash TEXT,
    credential_type TEXT NOT NULL CHECK (credential_type IN ('mobile', 'email')),
    expire_at TIMESTAMP,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);