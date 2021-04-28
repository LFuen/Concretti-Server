#!/bin/bash


psql -U lili -d concretti -f ./migrations/002.undo.create_orders.sql
psql -U lili -d concretti -f ./migrations/001.undo.create_users.sql

psql -U lili -d concretti -f ./migrations/001.do.create_users.sql
psql -U lili -d concretti -f ./migrations/002.do.create_orders.sql


psql -U lili -d concretti -f ./seeds/seed.tables.sql




# to run file type: ./migrateAndSeed.sh in terminal
# cahnge user name to whatever username you're using for your db role and db name if you created a db 
# with a name other than 'concretti' 
# after creation of this file, include it in the gitignore file so it doesn't upload again