-- ============================================
-- Base de Datos: Sistema de Usuarios y Roles
-- Motor: MySQL
-- ============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

-- ============================================
-- Tabla: roles
-- Descripción: Almacena los roles del sistema
-- ============================================
CREATE TABLE IF NOT EXISTS roles (
    roleId INT NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(100) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=Activo, 0=Inactivo',
    PRIMARY KEY (roleId),
    INDEX idx_roleName (roleName),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: user
-- Descripción: Almacena los usuarios del sistema
-- ============================================
CREATE TABLE IF NOT EXISTS user (
    userId INT NOT NULL AUTO_INCREMENT,
    roleId INT NOT NULL,
    user_name VARCHAR(45) NOT NULL,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    status VARCHAR(45) NOT NULL DEFAULT 'active',
    createUser VARCHAR(45) NOT NULL,
    createDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifiedUser VARCHAR(45) NULL,
    modifiedDate DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (userId),
    INDEX idx_roleId (roleId),
    INDEX idx_user_name (user_name),
    INDEX idx_status (status),
    INDEX idx_createDate (createDate),
    CONSTRAINT fk_user_role FOREIGN KEY (roleId) 
        REFERENCES roles(roleId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Datos de ejemplo para roles
-- ============================================
INSERT INTO roles (roleName, status) VALUES
('Administrador', 1),
('Usuario', 1),
('Supervisor', 1),
('Invitado', 0);

-- ============================================
-- Datos de ejemplo para usuarios
-- ============================================
INSERT INTO user (roleId, user_name, firstName, lastName, status, createUser, createDate) VALUES
(1, 'admin', 'Juan', 'Pérez', 'active', 'system', NOW()),
(2, 'jlopez', 'José', 'López', 'active', 'admin', NOW()),
(2, 'mgarcia', 'María', 'García', 'active', 'admin', NOW()),
(3, 'srodriguez', 'Sara', 'Rodríguez', 'active', 'admin', NOW()),
(2, 'cmartinez', 'Carlos', 'Martínez', 'inactive', 'admin', NOW());

-- ============================================
-- Consultas útiles
-- ============================================

-- Ver usuarios con sus roles
-- SELECT u.userId, u.user_name, u.firstName, u.lastName, r.roleName, u.status
-- FROM user u
-- INNER JOIN roles r ON u.roleId = r.roleId;

-- Ver solo usuarios activos
-- SELECT * FROM user WHERE status = 'active';

-- Contar usuarios por rol
-- SELECT r.roleName, COUNT(u.userId) as total_usuarios
-- FROM roles r
-- LEFT JOIN user u ON r.roleId = u.roleId
-- GROUP BY r.roleId, r.roleName;
