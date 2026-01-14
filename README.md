# Prueba Técnica - Proyectos

Este repositorio contiene dos proyectos independientes desarrollados como prueba técnica.

## Proyectos

### 1. Cash Machine (Máquina Monedera)

Cajero automático que calcula la menor cantidad de billetes y monedas para entregar una cantidad dada en dólares.

**Tecnología:** Node.js con JavaScript interactivo

**Características:**
- Interfaz de consola interactiva
- Denominaciones: $500, $200, $100, $50, $20, $10, $5, $2, $1, $0.50, $0.20, $0.10, $0.05, $0.02, $0.01
- Validaciones de entrada
- Muestra desglose completo del cambio

**Ejecutar:**
```bash
cd "cash machine"
npm install
npm start
```

**Ejemplo:**
```
Ingrese la cantidad en dólares: $1730.20

Resultado:
[
  500 => 3,    # $500 x 3 = $1500.00
  200 => 1,    # $200 x 1 = $200.00
  20 => 1,     # $20 x 1 = $20.00
  10 => 1,     # $10 x 1 = $10.00
  0.2 => 1     # $0.20 x 1 = $0.20
]

Total de billetes/monedas: 6
```

---

### 2. Login System (Sistema de Login)

Sistema completo de autenticación con gestión de usuarios, roles y bloqueo automático por intentos fallidos.

**Tecnologías:** 
- Backend: TypeScript + Express + MySQL
- Frontend: React + TypeScript + Vite

**Características:**
- ✅ Autenticación con JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Bloqueo automático después de 3 intentos fallidos
- ✅ Gestión de roles (admin/usuario)
- ✅ Solo administradores pueden desbloquear usuarios
- ✅ Validación de usuarios activos
- ✅ Dashboard con lista de usuarios
- ✅ Crear usuarios desde la UI
- ✅ Persistencia de sesión
- ✅ Migraciones con Flyway
- ✅ Patrón Repository/Service

**Base de Datos:**
```
roles (roleId, roleName, status)
user (userId, roleId, user_name, password, firstName, lastName, 
      status, failedLoginAttempts, isBlocked, lastLoginAttempt)
```

**Ejecutar Backend:**
```bash
cd login/backend
npm install
# Configurar .env con credenciales de base de datos
npm run migrate  # Ejecutar migraciones
npm run dev
```

**Ejecutar Frontend:**
```bash
cd login/frontend
npm install
npm run dev
```

**URLs:**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

**Usuarios de Prueba:**
- `admin` / `password123` (Administrador)
- `jlopez` / `password123` (Usuario)
- `mgarcia` / `password123` (Usuario)

**API Endpoints:**
```
POST   /api/auth/login          - Login
POST   /api/auth/logout         - Logout (requiere token)
GET    /api/users               - Listar usuarios (requiere token)
GET    /api/users/:id           - Ver usuario (requiere token)
POST   /api/users               - Crear usuario (requiere token)
POST   /api/users/:id/unlock    - Desbloquear (requiere token + rol admin)
```

---

## Estructura del Repositorio

```
./
├── cash machine/           # Proyecto 1: Máquina monedera
│   ├── index.js
│   ├── package.json
│   └── README.md
│
└── login/                  # Proyecto 2: Sistema de login
    ├── backend/
    │   ├── src/
    │   ├── sql/
    │   ├── .env.example
    │   └── package.json
    ├── frontend/
    │   ├── src/
    │   └── package.json
    └── README.md
```

## Requisitos Generales

- Node.js v18+
- npm o yarn

### Requisitos Adicionales para Login System

- MySQL 8.0 o MariaDB 10.x
- Docker (opcional, para base de datos)

## Documentación Detallada

Para instrucciones detalladas de cada proyecto, consultar sus respectivos README:

- [Cash Machine README](cash%20machine/README.md)
- [Login System README](login/README.md)


### Login System

**Backend:**
- TypeScript
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- Bcrypt
- Flyway (migraciones)
- Patrón Repository/Service

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- Context API
- CSS Modules

