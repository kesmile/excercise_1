-- ============================================
-- Flyway Migration V1: Create initial schema
-- Description: Create roles and user tables
-- ============================================

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    roleId INT NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(100) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=Active, 0=Inactive',
    PRIMARY KEY (roleId),
    INDEX idx_roleName (roleName),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user table
CREATE TABLE IF NOT EXISTS user (
    userId INT NOT NULL AUTO_INCREMENT,
    roleId INT NOT NULL,
    user_name VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    status VARCHAR(45) NOT NULL DEFAULT 'active',
    failedLoginAttempts INT DEFAULT 0,
    isBlocked TINYINT(1) DEFAULT 0,
    lastLoginAttempt DATETIME NULL,
    createUser VARCHAR(45) NOT NULL,
    createDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifiedUser VARCHAR(45) NULL,
    modifiedDate DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (userId),
    UNIQUE KEY unique_user_name (user_name),
    INDEX idx_roleId (roleId),
    INDEX idx_user_name (user_name),
    INDEX idx_status (status),
    INDEX idx_createDate (createDate),
    CONSTRAINT fk_user_role FOREIGN KEY (roleId) 
        REFERENCES roles(roleId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;