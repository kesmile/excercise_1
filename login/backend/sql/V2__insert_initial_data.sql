-- ============================================
-- Flyway Migration V2: Insert initial data
-- Description: Insert default roles and sample users
-- ============================================

-- Insert default roles
INSERT INTO roles (roleName, status) VALUES
('admin', 1),
('user', 1);

-- Insert sample users (password default: password123)
INSERT INTO user (roleId, user_name, password, firstName, lastName, status, createUser, createDate, modifiedUser) VALUES
(1, 'admin', '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy', 'Juan', 'Perez', 'active', 'system', NOW(), 'system'),
(1, 'admin2', '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy', 'Jose', 'Chavez', 'active', 'system', NOW(), 'system'),
(1, 'admin3', '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy', 'Luis', 'Rodriguez', 'active', 'system', NOW(), 'system'),
(2, 'jlopez', '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy', 'Rodrigo', 'Lopez', 'active', 'admin', NOW(), 'admin'),
(2, 'mgarcia', '$2b$10$c68lXwdcdHf3bnfxbBxLAepX0FdiM7vgF70VOW9X0DZoyk7Voouuy', 'Maria', 'Garcia', 'active', 'admin', NOW(), 'admin');
