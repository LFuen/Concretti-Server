#!/bin/bash

psql -U lili -d concretti -f ./migrations/003.undo.create_orders.sql
psql -U lili -d concretti -f ./migrations/002.undo.create_products.sql
psql -U lili -d concretti -f ./migrations/001.undo.create_users.sql

psql -U lili -d concretti -f ./migrations/001.do.create_users.sql
psql -U lili -d concretti -f ./migrations/002.do.create_products.sql
psql -U lili -d concretti -f ./migrations/003.do.create_orders.sql

psql -U lili -d concretti -f ./seeds/seed.tables.sql