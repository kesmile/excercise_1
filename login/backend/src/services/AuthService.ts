import { UserRepository } from '../repositories/UserRepository';
import { LoginRequest, LoginResponse } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const MAX_LOGIN_ATTEMPTS = 3;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const { user_name, password } = credentials;

        if (!user_name || !password) {
            throw new Error('Usuario y contraseña son requeridos');
        }

        const user = await this.userRepository.findByUsername(user_name);

        if (!user) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        if (user.isBlocked === 1) {
            throw new Error('Usuario bloqueado. Contacte al administrador');
        }

        if (user.status !== 'active') {
            throw new Error('Usuario inactivo');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            await this.handleFailedLogin(user);
            const newAttempts = (user.failedLoginAttempts || 0) + 1;
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - newAttempts;

            if (remainingAttempts <= 0) {
                throw new Error('Usuario bloqueado por múltiples intentos fallidos. Contacte al administrador');
            }

            throw new Error(`Usuario o contraseña incorrectos. Intentos restantes: ${remainingAttempts}`);
        }

        await this.userRepository.resetLoginAttempts(user.userId!);

        const token = this.generateToken(user);

        return {
            token,
            user: {
                userId: user.userId!,
                user_name: user.user_name,
                firstName: user.firstName,
                lastName: user.lastName,
                roleName: (user as any).roleName
            }
        };
    }

    private async handleFailedLogin(user: any): Promise<void> {
        const newAttempts = (user.failedLoginAttempts || 0) + 1;
        const shouldBlock = newAttempts >= MAX_LOGIN_ATTEMPTS;
        await this.userRepository.updateLoginAttempts(user.userId, newAttempts, shouldBlock ? 1 : 0);
    }

    private generateToken(user: any): string {
        return jwt.sign(
            {
                userId: user.userId,
                user_name: user.user_name,
                roleId: user.roleId,
                roleName: user.roleName
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );
    }
}
