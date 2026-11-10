CREATE TABLE IF NOT EXISTS brand (
    id SERIAL PRIMARY KEY,
    name TEXT,
    logo TEXT,
    details TEXT,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);