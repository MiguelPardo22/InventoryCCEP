INSERT INTO users (email, password_encrypted, state) VALUES ('admin@ccep.com', '$2y$10$vTQRAiz6drjpkN1xju55NOI48WZHdC36jZFjjniie3ZcP9clWMu0W', 'Activo');

INSERT INTO roles (name_role) VALUES ('Administrador');
INSERT INTO roles (name_role) VALUES ('Vendedor');

INSERT INTO users_roles VALUES (1, 1);