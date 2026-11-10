CREATE TABLE IF NOT EXISTS variant_images (
    id SERIAL PRIMARY KEY,
    variant_id BIGINT,
    image_url TEXT,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);