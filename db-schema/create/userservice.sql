------------------------------------------------------------
-- ROLES TABLE
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT NOT NULL PRIMARY KEY,        -- fixed ID for consistent permissions
    name VARCHAR(100) NOT NULL UNIQUE      -- e.g. ROLE_ADMIN
);

------------------------------------------------------------
-- USERS TABLE
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE
);

------------------------------------------------------------
-- USER_ROLES TABLE (JOIN TABLE)
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id) REFERENCES roles(id)
            ON DELETE CASCADE
);

------------------------------------------------------------
-- PREVENT DUPLICATE ROLE ASSIGNMENT
------------------------------------------------------------
ALTER TABLE user_roles
    ADD CONSTRAINT IF NOT EXISTS uk_user_roles UNIQUE (user_id, role_id);
