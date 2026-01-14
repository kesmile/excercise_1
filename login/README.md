# Sistema de Login con TypeScript, Express y React

Sistema completo de autenticación con gestión de usuarios, roles y bloqueo por intentos fallidos.

## Características

- Autenticación JWT
- Bloqueo automático después de 3 intentos fallidos
- Gestión de usuarios y roles
- Solo administradores pueden desbloquear usuarios
- Validación de usuarios activos al crear
- Frontend React con TypeScript
- Backend Express con patrón Repository/Service

## Requisitos Previos

- Node.js v18 o superior
- MySQL 8.0 o MariaDB 10.x
- npm o yarn
- Flyway CLI (opcional, se puede usar npx)

## Estructura del Proyecto

```
login/
├── backend/          # API REST con Express y TypeScript
├── frontend/         # UI con React y TypeScript
└── README.md
```

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-repositorio>
cd login
```

### 2. Configurar Base de Datos

#### Opción A: Usando Docker

```bash
docker run -d \
  --name mariadb \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=logindemo \
  -e MYSQL_USER=demouser \
  -e MYSQL_PASSWORD=demopassword \
  mariadb:10.11
```

#### Opción B: MySQL/MariaDB local

Conectarse a MySQL y ejecutar:

```sql
CREATE DATABASE logindemo;
CREATE USER 'demouser'@'localhost' IDENTIFIED BY 'demopassword';
GRANT ALL PRIVILEGES ON logindemo.* TO 'demouser'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configurar Backend

```bash
cd backend
npm install
```

#### Crear archivo .env

```bash
cp .env.example .env
```

Editar `backend/.env` con tus credenciales:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=demouser
DB_PASSWORD=demopassword
DB_NAME=logindemo

# Servidor
PORT=3000

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=24h
```

#### Ejecutar Migraciones con Flyway

##### Opción 1: Usando npm (Recomendado)

El proyecto ya incluye node-flywaydb:

```bash
npm run migrate
```

##### Opción 2: Usando Flyway CLI

Editar `backend/flyway.conf` con tus credenciales y ejecutar:

```bash
flyway migrate
```

##### Opción 3: Manualmente

Ejecutar los scripts SQL en orden:

```bash
# Desde la carpeta backend
mysql -u demouser -p logindemo < sql/V1__create_tables.sql
mysql -u demouser -p logindemo < sql/V2__insert_initial_data.sql
```

#### Verificar Migraciones

```bash
# Ver estado de migraciones
npm run migrate:info

# O con Flyway CLI
flyway info
```

#### Iniciar Backend

```bash
# Modo desarrollo con hot-reload
npm run dev

# O en producción
npm run build
npm start
```

El backend estará disponible en `http://localhost:3000`

### 4. Configurar Frontend

```bash
cd ../frontend
npm install
```

#### Iniciar Frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Uso

### Acceder a la Aplicación

1. Abrir navegador en `http://localhost:5173`
2. Iniciar sesión con credenciales de prueba

### Usuarios de Prueba

| Usuario | Contraseña  | Rol   |
|---------|------------|-------|
| admin   | password123 | Admin |
| jlopez  | password123 | User  |
| mgarcia | password123 | User  |

### Funcionalidades

#### Login
- Ingresa usuario y contraseña
- Si las credenciales son correctas, redirige al dashboard
- Después de 3 intentos fallidos, el usuario se bloquea automáticamente

#### Dashboard (Usuarios Autenticados)
- Ver lista de todos los usuarios
- Ver estado de cada usuario (activo/bloqueado)
- Crear nuevos usuarios
- Desbloquear usuarios (solo admin)

#### Crear Usuario
- Completar formulario con datos del usuario
- Validación: el usuario no debe existir como activo
- Password se hashea automáticamente con bcrypt

#### Desbloquear Usuario
- Solo usuarios con rol "admin" pueden desbloquear
- Resetea intentos fallidos a 0
- El usuario puede volver a intentar login

#### Cerrar Sesión
- Cierra la sesión actual
- Elimina token del localStorage
- Redirige a login

## API Endpoints

### Públicos

```http
POST /api/auth/login
Content-Type: application/json

{
  "user_name": "admin",
  "password": "password123"
}
```

### Protegidos (requieren token)

```http
# Headers para todas las peticiones protegidas
Authorization: Bearer <token>
```

#### Usuarios

```http
# Listar usuarios
GET /api/users

# Ver usuario por ID
GET /api/users/:id

# Crear usuario
POST /api/users
Content-Type: application/json

{
  "roleId": 2,
  "user_name": "nuevousuario",
  "password": "password123",
  "firstName": "Nombre",
  "lastName": "Apellido"
}

# Cerrar sesión
POST /api/auth/logout
```

#### Solo Administradores

```http
# Desbloquear usuario
POST /api/users/:id/unlock
```

## Estructura de Base de Datos

### Tabla: roles

```sql
roleId INT PRIMARY KEY AUTO_INCREMENT
roleName VARCHAR(100)
status TINYINT(1) -- 1=Activo, 0=Inactivo
```

### Tabla: user

```sql
userId INT PRIMARY KEY AUTO_INCREMENT
roleId INT FOREIGN KEY
user_name VARCHAR(45) UNIQUE
password VARCHAR(255)
firstName VARCHAR(45)
lastName VARCHAR(45)
status VARCHAR(45) -- active/inactive
failedLoginAttempts INT DEFAULT 0
isBlocked TINYINT(1) DEFAULT 0
lastLoginAttempt DATETIME
createUser VARCHAR(45)
createDate DATETIME
modifiedUser VARCHAR(45)
modifiedDate DATETIME
```

## Arquitectura

### Backend

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuración de MySQL
│   ├── controllers/
│   │   └── authController.ts    # Controladores HTTP
│   ├── services/
│   │   ├── AuthService.ts       # Lógica de autenticación
│   │   └── UserService.ts       # Lógica de usuarios
│   ├── repositories/
│   │   └── UserRepository.ts    # Acceso a datos
│   ├── middleware/
│   │   └── auth.ts              # Middleware JWT
│   ├── models/
│   │   └── User.ts              # Interfaces TypeScript
│   ├── routes/
│   │   └── userRoutes.ts        # Rutas de la API
│   └── index.ts                 # Entry point
├── sql/
│   ├── V1__create_tables.sql    # Migración: crear tablas
│   └── V2__insert_initial_data.sql # Migración: datos iniciales
├── .env
├── flyway.conf
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── UserList.tsx
│   │   ├── CreateUserModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx      # Context API para auth
│   ├── services/
│   │   └── api.ts               # Cliente API con axios
│   ├── types/
│   │   └── user.ts              # Tipos TypeScript
│   ├── styles/
│   │   └── *.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Scripts Disponibles

### Backend

```bash
npm run dev       # Iniciar en modo desarrollo
npm run build     # Compilar TypeScript
npm start         # Iniciar en producción
npm run migrate   # Ejecutar migraciones Flyway
```

### Frontend

```bash
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Compilar para producción
npm run preview   # Previsualizar build de producción
npm run deploy    # Desplegar a GitHub Pages
```

## Despliegue en GitHub Pages

### 1. Configurar Variables de Entorno

Editar `frontend/.env.production`:

```env
VITE_API_URL=https://tu-backend-api.com/api
VITE_BASE_PATH=/nombre-repositorio
```

### 2. Configurar vite.config.ts

Si tu repositorio es `https://github.com/usuario/proyecto`, actualizar:

```typescript
export default defineConfig({
  base: '/proyecto/', // Nombre del repositorio
  // ...resto de configuración
})
```

### 3. Desplegar

Opción A: Usando npm script

```bash
cd frontend
npm install gh-pages --save-dev
npm run deploy
```

Opción B: Usando script manual

```bash
cd frontend
npm run build

# Inicializar git en dist/
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:usuario/proyecto.git main:gh-pages
```

### 4. Configurar GitHub Pages

1. Ir a Settings → Pages en tu repositorio
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

Tu app estará en: `https://usuario.github.io/proyecto/`

### Configuración de URL del Backend

El frontend necesita conocer la URL del backend. Hay dos opciones:

**Opción 1: Backend en servidor propio**

```env
# .env.production
VITE_API_URL=https://mi-backend.herokuapp.com/api
```

**Opción 2: Backend local para desarrollo**

```env
# .env.development
VITE_API_URL=/api  # Usa proxy de Vite
```

**Importante:** Si el backend está en diferente dominio, debe tener CORS configurado:

```typescript
// backend/src/index.ts
app.use(cors({
  origin: ['https://usuario.github.io', 'http://localhost:5173'],
  credentials: true
}));
```

## Troubleshooting

### Error: "Unable to instantiate JDBC driver"

El driver de MySQL no está disponible. Usar migración con npm:

```bash
npm run migrate
```

### Error: "Access denied for user"

Verificar credenciales en `.env` y que el usuario tenga permisos:

```bash
# Verificar usuario en MySQL
mysql -u demouser -p
```

### Error: "CORS policy"

Asegurarse de que el backend está corriendo en puerto 3000 y el frontend en 5173.

### Error al refrescar: "Redirige a login"

Verificar que el token está guardado en localStorage. La sesión debería persistir después del refresh.

### Usuario bloqueado

Solo un administrador puede desbloquear. Iniciar sesión como admin y usar el botón "Desbloquear" en la lista de usuarios.

## Tecnologías Utilizadas

### Backend
- Node.js
- TypeScript
- Express.js
- MySQL2
- Bcrypt (hash de passwords)
- JWT (autenticación)
- Flyway (migraciones)

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- Context API

## Seguridad

- Passwords hasheados con bcrypt (salt rounds: 10)
- Tokens JWT con expiración configurable
- Protección contra fuerza bruta (bloqueo después de 3 intentos)
- Validación de roles para acciones sensibles
- CORS configurado
- Variables de entorno para secrets

## Mejoras Futuras

- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Logs de auditoría
- [ ] Recuperación de contraseña
- [ ] Two-factor authentication
- [ ] Paginación en lista de usuarios
- [ ] Filtros y búsqueda
- [ ] Tests unitarios y de integración

## Licencia

ISC

## Autor

Sistema desarrollado como prueba técnica
