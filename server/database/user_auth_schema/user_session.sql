CREATE TABLE IF NOT EXISTS user_session (
    id SERIAL PRIMARY KEY,
    refresh_token TEXT,
    ip_address INET,
    expire_at TIMESTAMP,
    revoked boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);