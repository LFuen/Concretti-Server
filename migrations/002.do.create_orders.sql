begin;

create type phase as enum(
    'In Production', 
    'Produced', 
    'In Stock'
);

create table if not exists products(
    product_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    product_name text UNIQUE NOT NULL,
    product_weight INTEGER NOT NULL
);

create table if not exists colors(
    color_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    color_name text UNIQUE NOT NULL, 
    pigment_one text, 
    pigment_two text, 
    pigment_three text, 
    perk_one decimal,
    perk_two decimal,
    perk_three decimal
);



CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    color integer references colors(color_id) on delete cascade not null,
    product integer references products(product_id) on delete cascade not null,
    amount INTEGER NOT NULL,
    prty_lvl INTEGER NOT NULL,
    phase phase NOT NULL
);

commit;