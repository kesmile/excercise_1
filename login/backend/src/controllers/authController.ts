import { Response } from 'express';
import { LoginRequest } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

const authService = new AuthService();
const userService = new UserService();

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const credentials: LoginRequest = req.body;
        const result = await authService.login(credentials);
        res.json(result);
    } catch (error: any) {
        console.error('Error en login:', error);

        if (error.message.includes('bloqueado')) {
            res.status(403).json({ message: error.message });
        } else if (error.message.includes('inactivo')) {
            res.status(403).json({ message: error.message });
        } else if (error.message.includes('requeridos')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(401).json({ message: error.message });
        }
    }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    res.json({ message: 'Sesión cerrada exitosamente' });
};

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { roleId, user_name, password, firstName, lastName } = req.body;
        const createUser = req.user?.user_name || 'system';

        const userId = await userService.createUser({
            roleId,
            user_name,
            password,
            firstName,
            lastName,
            createUser
        });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            userId
        });
    } catch (error: any) {
        console.error('Error al crear usuario:', error);

        if (error.message.includes('requeridos')) {
            res.status(400).json({ message: error.message });
        } else if (error.message.includes('ya existe')) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error al crear usuario', error: error.message });
        }
    }
};

export const unlockUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const adminUsername = req.user?.user_name || 'admin';

        await userService.unlockUser(userId, adminUsername);
        res.json({ message: 'Usuario desbloqueado exitosamente' });
    } catch (error: any) {
        console.error('Error al desbloquear usuario:', error);

        if (error.message.includes('no encontrado')) {
            res.status(404).json({ message: error.message });
        } else if (error.message.includes('no está bloqueado')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error al desbloquear usuario', error: error.message });
        }
    }
};

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error: any) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error: any) {
        console.error('Error al obtener usuario:', error);

        if (error.message.includes('no encontrado')) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
        }
    }
};