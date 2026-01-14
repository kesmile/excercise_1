export interface User {
    userId?: number;
    roleId: number;
    user_name: string;
    password: string;
    firstName: string;
    lastName: string;
    status: string;
    failedLoginAttempts?: number;
    isBlocked?: number;
    lastLoginAttempt?: Date;
    createUser: string;
    createDate?: Date;
    modifiedUser: string;
    modifiedDate?: Date;
}

export interface Role {
    roleId?: number;
    roleName: string;
    status: number;
}

export interface UserWithRole extends User {
    roleName?: string;
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
