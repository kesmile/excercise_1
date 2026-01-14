import { pool } from '../config/database';
import { User } from '../models/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserRepository {
    async findByUsername(username: string): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.*, r.roleName 
             FROM user u 
             LEFT JOIN roles r ON u.roleId = r.roleId 
             WHERE u.user_name = ?`,
            [username]
        );
        return rows.length > 0 ? rows[0] as User : null;
    }

    async findById(userId: number): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.userId, u.roleId, u.user_name, u.firstName, u.lastName, 
                    u.status, u.failedLoginAttempts, u.isBlocked, u.lastLoginAttempt, 
                    u.createDate, r.roleName 
             FROM user u 
             LEFT JOIN roles r ON u.roleId = r.roleId 
             WHERE u.userId = ?`,
            [userId]
        );
        return rows.length > 0 ? rows[0] as User : null;
    }

    async findAll(): Promise<User[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT u.userId, u.roleId, u.user_name, u.firstName, u.lastName, 
                    u.status, u.failedLoginAttempts, u.isBlocked, u.lastLoginAttempt, 
                    u.createDate, r.roleName 
             FROM user u 
             LEFT JOIN roles r ON u.roleId = r.roleId`
        );
        return rows as User[];
    }

    async create(user: Partial<User>): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO user (roleId, user_name, password, firstName, lastName, status, createUser, modifiedUser) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user.roleId,
                user.user_name,
                user.password,
                user.firstName,
                user.lastName,
                user.status || 'active',
                user.createUser,
                user.modifiedUser
            ]
        );
        return result.insertId;
    }

    async updateLoginAttempts(userId: number, attempts: number, isBlocked: number): Promise<void> {
        await pool.query<ResultSetHeader>(
            `UPDATE user 
             SET failedLoginAttempts = ?, isBlocked = ?, lastLoginAttempt = NOW() 
             WHERE userId = ?`,
            [attempts, isBlocked, userId]
        );
    }

    async resetLoginAttempts(userId: number): Promise<void> {
        await pool.query<ResultSetHeader>(
            `UPDATE user 
             SET failedLoginAttempts = 0, lastLoginAttempt = NOW() 
             WHERE userId = ?`,
            [userId]
        );
    }

    async unlock(userId: number, modifiedBy: string): Promise<void> {
        await pool.query<ResultSetHeader>(
            `UPDATE user 
             SET isBlocked = 0, failedLoginAttempts = 0, modifiedUser = ? 
             WHERE userId = ?`,
            [modifiedBy, userId]
        );
    }

    async update(userId: number, user: Partial<User>): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE user 
             SET roleId = ?, user_name = ?, firstName = ?, lastName = ?, status = ?, modifiedUser = ? 
             WHERE userId = ?`,
            [user.roleId, user.user_name, user.firstName, user.lastName, user.status, user.modifiedUser, userId]
        );
        return result.affectedRows > 0;
    }

    async delete(userId: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM user WHERE userId = ?',
            [userId]
        );
        return result.affectedRows > 0;
    }
}
