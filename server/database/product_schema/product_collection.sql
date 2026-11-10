CREATE TABLE IF NOT EXISTS product_collection (
    id SERIAL PRIMARY KEY,
    product_id BIGINT,
    collection_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);