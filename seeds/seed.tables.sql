BEGIN;

TRUNCATE
    "users";

INSERT INTO "users" ("user_department", "user_password", "is_admin")
VALUES
    ('admin', 'Admin2021', true),
    ('production', 'Prod2021', false),
    ('shipping', 'Ship2021', false);

COMMIT;