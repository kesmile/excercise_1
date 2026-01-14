import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        user_name: string;
        roleId: number;
        roleName: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'No se proporcionó token de autenticación' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.roleName !== 'admin') {
        res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción' });
        return;
    }
    next();
};
