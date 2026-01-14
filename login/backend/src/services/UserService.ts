import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    }

    async createUser(userData: {
        roleId: number;
        user_name: string;
        password: string;
        firstName: string;
        lastName: string;
        createUser: string;
    }): Promise<number> {
        const { roleId, user_name, password, firstName, lastName, createUser } = userData;

        if (!user_name || !password || !firstName || !lastName || !roleId) {
            throw new Error('Todos los campos son requeridos');
        }

        const existingUser = await this.userRepository.findByUsername(user_name);

        if (existingUser && existingUser.status === 'active') {
            throw new Error('El usuario ya existe y está activo');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await this.userRepository.create({
            roleId,
            user_name,
            password: hashedPassword,
            firstName,
            lastName,
            status: 'active',
            createUser,
            modifiedUser: createUser
        });

        return userId;
    }

    async unlockUser(userId: number, adminUsername: string): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.isBlocked === 0) {
            throw new Error('El usuario no está bloqueado');
        }

        await this.userRepository.unlock(userId, adminUsername);
    }

    async updateUser(userId: number, userData: Partial<User>): Promise<void> {
        const updated = await this.userRepository.update(userId, userData);

        if (!updated) {
            throw new Error('Usuario no encontrado');
        }
    }

    async deleteUser(userId: number): Promise<void> {
        const deleted = await this.userRepository.delete(userId);

        if (!deleted) {
            throw new Error('Usuario no encontrado');
        }
    }
}
