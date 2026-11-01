CREATE TABLE IF NOT EXISTS user_credential (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    pass_hash TEXT,
    fail_attemps INT,
    locked_until TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);