CREATE TABLE IF NOT EXISTS aouth_account (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    provider TEXT,
    provider_user_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);