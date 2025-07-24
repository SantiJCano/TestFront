# 🎨 Task Management Frontend - Interfaz de Usuario del Sistema de Gestión de Tareas

## 📋 Descripción

Interfaz de usuario moderna desarrollada con **React 19** y **TypeScript** para el sistema de gestión de tareas. Proporciona una experiencia de usuario intuitiva y responsiva para la administración completa de tareas, incluyendo autenticación, registro y operaciones CRUD.

## 🛠️ Tecnologías Utilizadas

- **Framework**: React 19.x
- **Lenguaje**: TypeScript 5.x
- **Bundler**: Vite 7.x
- **Routing**: React Router DOM 7.x
- **Estilos**: CSS3 con diseño responsivo
- **Linting**: ESLint con configuración TypeScript
- **Desarrollo**: Hot Module Replacement (HMR)

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── LoginForm.tsx     # Formulario de inicio de sesión
│   ├── RegisterForm.tsx  # Formulario de registro
│   ├── TaskForm.tsx      # Formulario de tareas
│   ├── ProtectedRoute.tsx # Rutas protegidas
│   └── UserMenu.tsx      # Menú de usuario
├── services/            # Servicios de API
│   ├── auth.ts          # Autenticación
│   ├── register.ts      # Registro de usuarios
│   └── tasks.ts         # Gestión de tareas
├── context/             # Contextos de React
├── pages/               # Páginas principales
├── assets/              # Recursos estáticos
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales

## ✨ Funcionalidades

### 🔐 Autenticación y Registro
- **Inicio de sesión**: Formulario seguro con validación
- **Registro de usuarios**: Creación de cuentas nuevas
- **Gestión de tokens**: Almacenamiento seguro de JWT
- **Rutas protegidas**: Acceso controlado a funcionalidades

### 📝 Gestión de Tareas
- **Visualización**: Lista completa de tareas del usuario
- **Creación**: Formulario para nuevas tareas
- **Edición**: Modificación de tareas existentes
- **Eliminación**: Borrado con confirmación
- **Filtrado**: Por estado y prioridad
- **Estados**: Pendiente, En progreso, Completada
- **Prioridades**: Baja, Media, Alta

### 🎨 Interfaz de Usuario
- **Diseño responsivo**: Adaptable a diferentes dispositivos
- **Interfaz moderna**: Diseño limpio y profesional
- **Feedback visual**: Indicadores de carga y estados
- **Navegación intuitiva**: Menús y rutas claras

## 🔧 Configuración e Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Backend API ejecutándose (puerto 3000 por defecto)

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del backend
VITE_API_URL=http://localhost:3000

# Configuración de desarrollo
VITE_DEV_MODE=true
```

### Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

3. **Construir para producción**:
   ```bash
   npm run build
   ```

4. **Vista previa de producción**:
   ```bash
   npm run preview
   ```

## 📡 Integración con la API

### Configuración de Servicios

La aplicación se conecta con el backend a través de servicios organizados:

```typescript
// services/auth.ts
export const login = async (email: string, password: string)
export const logout = () => void

// services/register.ts
export const registerUser = async (userData: RegisterData)

// services/tasks.ts
export const getTasks = async (): Promise<Task[]>
export const createTask = async (task: CreateTaskData): Promise<Task>
export const updateTask = async (id: number, task: UpdateTaskData): Promise<Task>
export const deleteTask = async (id: number): Promise<void>
```

### Manejo de Autenticación

- **Tokens JWT**: Almacenados en localStorage
- **Headers de autorización**: Incluidos automáticamente
- **Redirección**: Automática en caso de tokens expirados
- **Rutas protegidas**: Verificación de autenticación

## 🗄️ Tipos de Datos

### Usuario
```typescript
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
```

### Tarea
```typescript
interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Datos de Registro
```typescript
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

## 🎨 Estilos y Diseño

### Características del Diseño
- **Paleta de colores**: Moderna y profesional
- **Tipografía**: Legible y consistente
- **Espaciado**: Sistema de grid responsivo
- **Animaciones**: Transiciones suaves
- **Iconografía**: Consistente y clara

### Responsividad
- **Móvil**: Optimizado para pantallas pequeñas
- **Tablet**: Adaptación a pantallas medianas
- **Desktop**: Aprovechamiento completo del espacio

## 🧪 Testing y Calidad

```bash
# Linting del código
npm run lint

# Verificación de tipos TypeScript
npm run type-check

# Construcción para verificar errores
npm run build
```

## 📦 Scripts Disponibles

```bash
npm run dev            # Servidor de desarrollo con HMR
npm run build          # Construir para producción
npm run preview        # Vista previa de la construcción
npm run lint           # Verificar código con ESLint
npm run type-check     # Verificación de tipos TypeScript
```

## 🚀 Despliegue

### Construcción para Producción

1. **Variables de entorno de producción**
2. **Construir aplicación**: `npm run build`
3. **Archivos generados**: Carpeta `dist/`

### Opciones de Despliegue

- **Netlify**: Despliegue automático desde Git
- **Vercel**: Integración con repositorios
- **GitHub Pages**: Para proyectos públicos
- **Servidor web**: Servir archivos estáticos

### Configuración de Servidor Web

```nginx
# nginx.conf
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Desarrollo

### Configuración del Entorno

1. **Editor recomendado**: VS Code
2. **Extensiones útiles**:
   - TypeScript and JavaScript Language Features
   - ES7+ React/Redux/React-Native snippets
   - Auto Rename Tag
   - Prettier - Code formatter

### Estructura de Componentes

```typescript
// Ejemplo de componente
import React, { useState } from 'react';

interface Props {
  // Definir props
}

const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<Type>(initialValue);
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Guías de Contribución

- **Código limpio**: Seguir las convenciones de TypeScript
- **Componentes reutilizables**: Crear componentes modulares
- **Documentación**: Comentar código complejo
- **Testing**: Agregar tests para nuevas funcionalidades

## 🔗 Enlaces Útiles

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

---

**Desarrollado con React, TypeScript y Vite**
