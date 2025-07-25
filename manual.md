# 📋 Manual de Instalación - Sistema de Gestión de Tareas

## 📖 Descripción General

Este manual proporciona instrucciones detalladas para instalar y configurar el sistema completo de gestión de tareas, que incluye:

- **Backend**: API REST con NestJS + PostgreSQL
- **Frontend**: Aplicación React con TypeScript

## 🔧 Prerrequisitos del Sistema

### Software Requerido

1. **Node.js** (v18 o superior)
   - Descargar desde: https://nodejs.org/
   - Verificar instalación: `node --version`

2. **PostgreSQL** (v12 o superior)
   - Descargar desde: https://www.postgresql.org/download/
   - Verificar instalación: `psql --version`

3. **Git** (opcional, para clonar repositorio)
   - Descargar desde: https://git-scm.com/

4. **Editor de código** (recomendado: VS Code)
   - Descargar desde: https://code.visualstudio.com/

### Verificación de Prerrequisitos

```bash
# Verificar versiones instaladas
node --version    # Debe ser v18+
npm --version     # Viene con Node.js
psql --version    # PostgreSQL
```

## 🗄️ Configuración de Base de Datos

### 1. Crear Base de Datos

```sql
-- Conectar a PostgreSQL como superusuario
psql -U postgres

-- Crear base de datos
CREATE DATABASE task_management;

-- Crear usuario (opcional)
CREATE USER task_user WITH PASSWORD 'tu_password_seguro';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE task_management TO task_user;

-- Salir de psql
\q
```

### 2. Verificar Conexión

```bash
# Probar conexión con la nueva base de datos
psql -U task_user -d task_management -h localhost
```

## 🚀 Instalación del Backend

### 1. Navegar al Directorio

```bash
cd c:\Users\santi\Downloads\proyectogalio\project-galio
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# Verificar que no hay errores
npm audit
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto backend:

```bash
# Crear archivo .env
touch .env  # En Windows: type nul > .env
```

Contenido del archivo `.env`:

```env
# === CONFIGURACIÓN DE BASE DE DATOS ===
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=task_user
DATABASE_PASSWORD=tu_password_seguro
DATABASE_NAME=task_management

# === CONFIGURACIÓN JWT ===
JWT_SECRET=tu_clave_secreta_muy_muy_segura_aqui_2024
JWT_EXPIRES_IN=24h

# === CONFIGURACIÓN DEL SERVIDOR ===
PORT=3000
NODE_ENV=development

# === CONFIGURACIÓN CORS ===
FRONTEND_URL=http://localhost:5173
```

### 4. Ejecutar Migraciones (si existen)

```bash
# Sincronizar esquema de base de datos
npm run start:dev
# TypeORM creará las tablas automáticamente en modo desarrollo
```

### 5. Verificar Funcionamiento

```bash
# Ejecutar en modo desarrollo
npm run start:dev

# La API debería estar disponible en: http://localhost:3000
# Verificar en el navegador: http://localhost:3000
```

### 6. Probar Endpoints (opcional)

```bash
# Probar endpoint de salud (si existe)
curl http://localhost:3000

# O usar herramientas como Postman/Insomnia
```

## 🎨 Instalación del Frontend

### 1. Navegar al Directorio

```bash
cd c:\Users\santi\Downloads\proyectogalio\task-management-frontend
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# Verificar instalación
npm list --depth=0
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto frontend:

```bash
# Crear archivo .env
touch .env  # En Windows: type nul > .env
```

Contenido del archivo `.env`:

```env
# === URL DEL BACKEND ===
VITE_API_URL=http://localhost:3000

# === CONFIGURACIÓN DE DESARROLLO ===
VITE_DEV_MODE=true

# === CONFIGURACIÓN ADICIONAL ===
VITE_APP_NAME=Task Management
VITE_APP_VERSION=1.0.0
```

### 4. Verificar Funcionamiento

```bash
# Ejecutar en modo desarrollo
npm run dev

# La aplicación debería estar disponible en: http://localhost:5173
```

## 🔄 Proceso de Inicio Completo

### Orden de Inicio

1. **Primero**: Iniciar PostgreSQL
2. **Segundo**: Iniciar Backend (puerto 3000)
3. **Tercero**: Iniciar Frontend (puerto 5173)

### Script de Inicio Automático

Crear archivo `start.bat` (Windows) o `start.sh` (Linux/Mac):

```bash
#!/bin/bash
# start.sh

echo "🚀 Iniciando sistema de gestión de tareas..."

# Verificar que PostgreSQL esté ejecutándose
echo "📊 Verificando PostgreSQL..."
pg_isready -h localhost -p 5432

if [ $? -eq 0 ]; then
    echo "✅ PostgreSQL está ejecutándose"
else
    echo "❌ PostgreSQL no está disponible"
    exit 1
fi

# Iniciar backend en segundo plano
echo "🔧 Iniciando backend..."
cd project-galio
npm run start:dev &
BACKEND_PID=$!

# Esperar a que el backend esté listo
sleep 10

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd ../task-management-frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Sistema iniciado correctamente!"
echo "📡 Backend: http://localhost:3000"
echo "🌐 Frontend: http://localhost:5173"

# Mantener script ejecutándose
wait
```

## 🧪 Verificación de la Instalación

### 1. Verificar Backend

```bash
# Probar endpoint de registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### 2. Verificar Frontend

1. Abrir navegador en `http://localhost:5173`
2. Verificar que la página de login se carga
3. Intentar registrar un usuario de prueba
4. Verificar que el login funciona

### 3. Verificar Integración

1. Registrar usuario desde el frontend
2. Iniciar sesión
3. Crear una tarea de prueba
4. Verificar que la tarea se guarda en la base de datos

## 🔧 Solución de Problemas Comunes

### Backend no inicia

```bash
# Verificar puerto 3000 disponible
netstat -an | grep 3000

# Verificar variables de entorno
cat .env

# Verificar conexión a base de datos
npm run start:dev
# Revisar logs de error
```

### Frontend no se conecta al backend

```bash
# Verificar variables de entorno del frontend
cat .env

# Verificar que el backend esté ejecutándose
curl http://localhost:3000

# Verificar CORS en el backend
```

### Errores de base de datos

```bash
# Verificar que PostgreSQL esté ejecutándose
pg_isready

# Verificar credenciales
psql -U task_user -d task_management -h localhost

# Recrear base de datos si es necesario
dropdb task_management
createdb task_management
```

### Errores de dependencias

```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Configuración para Producción

### Backend en Producción

```bash
# Construir aplicación
npm run build

# Variables de entorno de producción
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=clave_super_segura_para_produccion
```

### Frontend en Producción

```bash
# Construir aplicación
npm run build

# Variables de entorno de producción
VITE_API_URL=https://tu-api.com
VITE_DEV_MODE=false
```

### Despliegue con Docker (opcional)

```dockerfile
# Dockerfile para backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start"]
```

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de React](https://react.dev/)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)

---

**Instalación completada!**

El sistema de gestión de tareas está listo para usar. Puedes acceder al frontend en `http://localhost:5173` y comenzar a crear tareas.
