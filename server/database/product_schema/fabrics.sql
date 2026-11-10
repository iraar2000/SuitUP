CREATE TABLE IF NOT EXISTS fabrics (
    id SERIAL PRIMARY KEY,
    product_id BIGINT,
    code TEXT,
    weave TEXT,
    pattern TEXT,
    finnish TEXT,
    stretch TEXT,
    season TEXT,
    country_of_origin TEXT,
    roll_count TEXT,
    roll_length BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);