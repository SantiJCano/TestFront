# 🎨 Task Management Frontend

Interfaz moderna con **React 19** y **TypeScript** para gestión de tareas.

---

## 🚀 Probar el CRUD Online

Puedes probar la aplicación directamente aquí: [https://test-front-zeta-wheat.vercel.app/](https://test-front-zeta-wheat.vercel.app/)

---

## 👤 ¿Cómo usar el CRUD?

1. **Registro:**
   - Haz clic en "Registrarse" y completa el formulario para crear una cuenta nueva.
2. **Login:**
   - Ingresa con tu email y contraseña registrados.
3. **Gestión de tareas:**
   - Una vez autenticado, accede al panel de tareas.
   - Puedes **crear**, **editar**, **eliminar** y **marcar como completadas** tus tareas.
   - Usa los filtros para buscar por estado o prioridad.
4. **Cerrar sesión:**
   - Utiliza el menú de usuario para cerrar sesión de forma segura.

> La app es responsiva y funciona tanto en móvil como en escritorio.

---

## 🛠️ Stack Tecnológico

- **React 19.x** + **TypeScript 5.x**
- **Vite 7.x** (bundler)
- **React Router DOM 7.x**
- **CSS3** responsivo

## 🏗️ Estructura

```
src/
├── components/    # Componentes (Login, Register, Tasks)
├── services/      # API calls (auth, tasks)
├── pages/         # Páginas principales
└── App.tsx        # Componente principal
```

## ✨ Funcionalidades

- **Autenticación**: Login/registro con JWT
- **Gestión de tareas**: CRUD completo
- **Filtros**: Por estado y prioridad
- **Interfaz responsiva**: Móvil y desktop
- **Rutas protegidas**: Acceso controlado

## ⚡ Inicio Rápido

```bash
npm install
npm run dev  # Puerto 5173
```

> 📖 **Instalación detallada**: Ver `manual.md`

## 📦 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run lint     # Linting
```
