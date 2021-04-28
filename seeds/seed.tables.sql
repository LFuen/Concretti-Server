BEGIN;

TRUNCATE
    "users";

INSERT INTO "users" ("user_department", "user_password", "is_admin")
VALUES
    ('admin', '$2y$12$GdIB9QwYVi4IU7v80VydP.McTWu35tnUBGPyuWHyov0KkxAw.zgR2', true), --Admin2021
    ('production', '$2y$12$z1yPB1y8d8VXc2iaK2o1EO.t6eWrO7j1o3BBIEkGU3PWR7Yyzstwu', false), --Prod2021
    ('shipping', '$2y$12$lSqp8.dC16/iBp5mOKj3ueMNt4RDXkIcVvQnQNJLTW3f.mP5NToK.', false); --Ship2021

COMMIT;