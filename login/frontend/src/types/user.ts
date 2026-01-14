export interface User {
    userId: number;
    user_name: string;
    firstName: string;
    lastName: string;
    roleName: string;
    roleId: number;
    status: string;
    failedLoginAttempts: number;
    isBlocked: number;
    lastLoginAttempt?: string;
    createDate: string;
}

export interface LoginRequest {
    user_name: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        userId: number;
        user_name: string;
        firstName: string;
        lastName: string;
        roleName: string;
    };
}

export interface CreateUserRequest {
    roleId: number;
    user_name: string;
    password: string;
    firstName: string;
    lastName: string;
}
