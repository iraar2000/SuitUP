CREATE TABLE IF NOT EXISTS fabric_composite_material (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    effects TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);