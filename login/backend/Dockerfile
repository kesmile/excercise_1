# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para compilar)
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=builder /app/dist ./dist

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
