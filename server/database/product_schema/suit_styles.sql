CREATE TABLE IF NOT EXISTS suit_style (
    id SERIAL PRIMARY KEY,
    jacket_style_id BIGINT,
    vest_style_id BIGINT,
    trouser_style_id BIGINT,
    name TEXT,
    description TEXT,
    manufacture_cost FLOAT,
    manufacture_time INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);