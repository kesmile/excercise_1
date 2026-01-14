import React from 'react';
import { User } from '../types/user';
import '../styles/UserList.css';

interface UserListProps {
    users: User[];
    onUnlock: (userId: number) => void;
    isAdmin: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onUnlock, isAdmin }) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleString('es-ES');
    };

    return (
        <div className="user-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Intentos Fallidos</th>
                        <th>Bloqueado</th>
                        <th>Último Intento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId} className={user.isBlocked ? 'blocked-row' : ''}>
                            <td>{user.userId}</td>
                            <td>{user.user_name}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>
                                <span className={`badge badge-${user.roleName}`}>
                                    {user.roleName}
                                </span>
                            </td>
                            <td>
                                <span className={`status status-${user.status}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>{user.failedLoginAttempts}</td>
                            <td>
                                {user.isBlocked ? (
                                    <span className="blocked">Bloqueado</span>
                                ) : (
                                    <span className="active">Activo</span>
                                )}
                            </td>
                            <td>{user.lastLoginAttempt ? formatDate(user.lastLoginAttempt) : 'N/A'}</td>
                            <td>
                                {user.isBlocked && isAdmin && (
                                    <button
                                        onClick={() => onUnlock(user.userId)}
                                        className="btn-unlock"
                                    >
                                        Desbloquear
                                    </button>
                                )}
                                {user.isBlocked && !isAdmin && (
                                    <span className="disabled-action">Solo admin</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
