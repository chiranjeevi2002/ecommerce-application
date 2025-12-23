CREATE TABLE IF NOT EXISTS stores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    branding_config_path VARCHAR(255),
    feature_flags TEXT,
    default_locale VARCHAR(50),
    default_currency VARCHAR(50),
    active BOOLEAN DEFAULT TRUE
);
