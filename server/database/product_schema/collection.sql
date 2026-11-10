CREATE TABLE IF NOT EXISTS collection (
    id SERIAL PRIMARY KEY,
    name TEXT,
    season TEXT,
    creator BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);