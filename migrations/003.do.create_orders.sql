create type color as enum(
    'Black',
    'Blush',
    'Dark Blue',
    'Light Blue',
    'Eggplant',
    'Kale',
    'Lavender',
    'Licorice',
    'Mustard',
    'Nude',
    'Peach',
    'Pistachio',
    'Platinum',
    'Red',
    'Stone',
    'Tangerine',
    'Terracotta',
    'Turquoise',
    'White'
)

create type phase as enum(
    'In Production', 
    'Produced', 
    'In Stock'
)


CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    product_id INTEGER NOT NULL REFERENCES products(product_id)
    color color NOT NULL,
    amount INTEGER NOT NULL,
    prty_lvl INTEGER NOT NULL,
    phase phase NOT NULL
);