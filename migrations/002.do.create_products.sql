CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    product_name VARCHAR NOT NULL
);