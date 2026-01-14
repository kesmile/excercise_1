import { Router } from 'express';
import { login, logout, createUser, unlockUser, getUsers, getUserById } from '../controllers/authController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Rutas públicas
router.post('/auth/login', login);

// Rutas protegidas (requieren autenticación)
router.post('/auth/logout', authMiddleware, logout);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.post('/users', authMiddleware, createUser);

// Rutas de administrador (requieren autenticación y rol admin)
router.post('/users/:id/unlock', authMiddleware, adminMiddleware, unlockUser);

export default router;
