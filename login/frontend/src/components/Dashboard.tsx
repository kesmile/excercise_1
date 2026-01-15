import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';
import { User } from '../types/user';
import UserList from './UserList';
import CreateUserModal from './CreateUserModal';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    const { user, logout, isAdmin } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleUnlock = async (userId: number) => {
        if (!isAdmin) {
            alert('Solo los administradores pueden desbloquear usuarios');
            return;
        }

        try {
            await userService.unlockUser(userId);
            alert('Usuario desbloqueado exitosamente');
            loadUsers();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al desbloquear usuario');
        }
    };

    const handleCreateUser = () => {
        loadUsers();
        setShowCreateModal(false);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>Panel de Administración</h1>
                    <div className="user-info">
                        <span>Bienvenido, {user?.firstName} {user?.lastName}</span>
                        <span className="badge">{user?.roleName}</span>
                        <button onClick={logout} className="btn-secondary">Cerrar Sesión</button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-actions">
                    <h2>Gestión de Usuarios</h2>
                    {isAdmin && (
                        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                            Crear Usuario
                        </button>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">Cargando usuarios...</div>
                ) : (
                    <UserList users={users} onUnlock={handleUnlock} isAdmin={isAdmin} />
                )}
            </main>

            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleCreateUser}
                />
            )}
        </div>
    );
};

export default Dashboard;
