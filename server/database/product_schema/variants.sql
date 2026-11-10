CREATE TYPE product_variant_status AS ENUM (
    'draft',
    'active',
    'inactive',
    'discontinued',
    'archived'
);

CREATE TABLE IF NOT EXISTS variants (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT,

    price NUMERIC(12,2) NOT NULL,
    cost_price NUMERIC(12,2),

    sku TEXT UNIQUE,
    variant_code TEXT UNIQUE,
    barcode TEXT UNIQUE,

    status product_variant_status NOT NULL DEFAULT 'draft',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);