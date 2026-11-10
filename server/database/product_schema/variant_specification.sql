CREATE TABLE IF NOT EXISTS variant_specification (
    id SERIAL PRIMARY KEY,
    variant_id BIGINT,
    specification_id BIGINT,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 