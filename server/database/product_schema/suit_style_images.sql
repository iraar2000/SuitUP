CREATE TABLE IF NOT EXISTS suit_style_images (
    id SERIAL PRIMARY KEY,
    style_id BIGINT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);