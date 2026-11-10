CREATE TABLE IF NOT EXISTS fabric_composite (
    id SERIAL PRIMARY KEY,
    fabric_id BIGINT,
    material_id BIGINT,
    percentage BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);