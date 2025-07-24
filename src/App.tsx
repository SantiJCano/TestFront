import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import LoginForm from './components/LoginForm';
import { login as loginService } from './services/auth';
import RegisterForm from './components/RegisterForm';
import { registerUser } from './services/register';
import ProtectedRoute from './components/ProtectedRoute';
import UserMenu from './components/UserMenu';

// Componente para la página de login
function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

    // Función que maneja el envío del formulario de login
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
            // Llama al servicio de login con email y contraseña
      const data = await loginService(email, password);
            // Guarda el token JWT en localStorage para mantener la sesión
      localStorage.setItem('token', data.access_token);
            // Redirige al usuario a la página de tareas
      navigate('/tasks');
    } catch (err: any) {
            // Muestra mensaje de error si las credenciales son incorrectas o hay otro error
      setError(err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

    // Renderiza el formulario de login, pasando los handlers y estados
  return <LoginForm onLogin={handleLogin} loading={loading} error={error} />;
}

// Componente para la página de registro de usuario
function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    // Estado para indicar si el registro fue exitoso
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

    // Función que maneja el envío del formulario de registro
  const handleRegister = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    setLoading(true);
    setError(null);
        // Limpia el mensaje de éxito previo
    setSuccess(false);
    try {
            // Llama al servicio para registrar el usuario con los datos del formulario
      await registerUser(data);
            // Indica que el registro fue exitoso
      setSuccess(true);
            // Redirige automáticamente al login después de 1.2 segundos
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
            // Muestra mensaje de error si ocurre un fallo al registrar
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RegisterForm onRegister={handleRegister} loading={loading} error={error} />
      {success && <div style={{ color: 'green', marginTop: 16 }}>¡Registro exitoso! Redirigiendo a login...</div>}
    </>
  );
}

// Importa funciones para obtener, eliminar y actualizar tareas desde los servicios
import { getTasks, deleteTask, updateTask } from './services/tasks';
// Importa el tipo Task para tipado estricto de TypeScript
import type { Task } from './services/tasks';

// Importa el formulario para crear o editar tareas
import TaskForm from './components/TaskForm';
// Importa la función para crear nuevas tareas
import { createTask } from './services/tasks';
// Importa el componente que lista todas las tareas
import TaskList from './components/TaskList';
// Importa el componente para mostrar alertas de éxito o error
import AlertMessage from './components/AlertMessage';
// Importa el componente para cambiar el tema (oscuro/claro)
import ThemeToggle from './components/ThemeToggle';

// Componente principal para la gestión y visualización de tareas
function TasksPage() {
    // Estado que almacena la lista de tareas obtenidas de la API
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Estados locales para eliminación
    // Estado para indicar si se está procesando una acción sobre una tarea individual (eliminar, actualizar)
  const [taskLoading, setTaskLoading] = useState(false);
    // Estado para almacenar errores específicos de acciones sobre tareas
  const [taskError, setTaskError] = useState<string | null>(null);
    // Estado para indicar si se está creando una tarea nueva
  const [creating, setCreating] = useState(false);
    // Estado para almacenar errores al crear una tarea
  const [createError, setCreateError] = useState<string | null>(null);
  // Estados para edición
    // Estado que almacena la tarea que está siendo editada actualmente
  const [editingTask, setEditingTask] = useState<Task | null>(null);
    // Estado para indicar si el usuario está en modo edición de tarea
  const [editing, setEditing] = useState(false);
    // Estado para indicar si se está guardando una tarea editada
  const [editLoading, setEditLoading] = useState(false);
    // Estado para almacenar errores al editar una tarea
  const [editError, setEditError] = useState<string | null>(null);
  // Estado para alertas de éxito
    // Estado para mostrar mensajes de éxito (crear, editar, eliminar)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Oculta la alerta de éxito automáticamente
    // Efecto para ocultar automáticamente la alerta de éxito después de 2 segundos
  React.useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

    // Función que obtiene la lista de tareas desde la API usando el token JWT
  const fetchTasks = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autorizado. Inicia sesión.');
      setLoading(false);
      return;
    }
    setLoading(true);
    getTasks(token)
      .then(setTasks)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

    // Función que maneja la creación de una nueva tarea
  const handleCreate = async (data: Parameters<typeof createTask>[1]) => {
    setCreating(true);
    setCreateError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setCreateError('No autorizado. Inicia sesión.');
      setCreating(false);
      return;
    }
    try {
      const newTask = await createTask(token, data);
      setTasks(prev => [newTask, ...prev]);
      setSuccessMessage('¡Tarea creada exitosamente!');
    } catch (err: any) {
      setCreateError(err.message || 'Error al crear la tarea');
    } finally {
      setCreating(false);
    }
  };

    // Función que activa el modo edición para una tarea seleccionada
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditing(true);
    setEditError(null);
  };

    // Función que maneja la actualización de una tarea editada
  const handleUpdate = async (data: Parameters<typeof updateTask>[2]) => {
    if (!editingTask) return;
    setEditLoading(true);
    setEditError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setEditError('No autorizado. Inicia sesión.');
      setEditLoading(false);
      return;
    }
    try {
      const updated = await updateTask(token, editingTask.id, data);
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
      setEditing(false);
      setEditingTask(null);
      setSuccessMessage('¡Tarea actualizada exitosamente!');
    } catch (err: any) {
      setEditError(err.message || 'Error al actualizar la tarea');
    } finally {
      setEditLoading(false);
    }
  };

    // Función que cancela la edición de una tarea y limpia los estados relacionados
  const handleCancelEdit = () => {
    setEditing(false);
    setEditingTask(null);
    setEditError(null);
  };

    // Estado para el texto de búsqueda de tareas
  const [search, setSearch] = useState('');
    // Estado para el filtro de prioridad de tareas
  const [filterPriority, setFilterPriority] = useState('');
    // Estado para el filtro de estado de tareas
  const [filterStatus, setFilterStatus] = useState('');

    // Si las tareas están cargando, muestra un mensaje de carga
  if (loading) return <p>Cargando tareas...</p>;
    // Si hay un error general, muestra el mensaje en rojo
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // Filtra las tareas según búsqueda, prioridad y estado seleccionados
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div>
      <h2>Mis tareas</h2>
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: 240 }}
          placeholder="Buscar por título o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: 170 }}
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
        >
          <option value="">Todas las prioridades</option>
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Media</option>
          <option value="LOW">Baja</option>
        </select>
        <select
          className="form-select"
          style={{ maxWidth: 170 }}
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="COMPLETED">Completada</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="PENDING">Pendiente</option>
        </select>
      </div>

      <div className="fade-in">
        {editing ? (
          <TaskForm
            onCreate={async () => {}}
            onUpdate={handleUpdate}
            initialData={editingTask ? {
              title: editingTask.title,
              description: editingTask.description,
              priority: editingTask.priority,
              dueDate: editingTask.dueDate,
            } : undefined}
            isEditing
            loading={editLoading}
            error={editError}
          />
        ) : (
          <TaskForm onCreate={handleCreate} loading={creating} error={createError} />
        )}
        {editing && (
          <button onClick={handleCancelEdit} style={{ marginBottom: 16 }}>Cancelar edición</button>
        )}
        {successMessage && (
          <AlertMessage
            message={successMessage}
            type="success"
            autoHideMs={2000}
            onClose={() => setSuccessMessage(null)}
            className="text-center fade-in"
          />
        )}
      </div>
      <div className="slide-in">
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={async (task: Task) => {
            if (window.confirm('¿Seguro que quieres eliminar esta tarea?')) {
              try {
                setTaskError(null);
                setTaskLoading(true);
                const token = localStorage.getItem('token');
                await deleteTask(task.id, token!);
                setTasks((prev) => prev.filter((t) => t.id !== task.id));
                setSuccessMessage('¡Tarea eliminada exitosamente!');
              } catch (err: any) {
                setTaskError(err.message || 'Error al eliminar la tarea');
              } finally {
                setTaskLoading(false);
              }
            }
          }}
          onStatusChange={async (task: Task, status: 'COMPLETED' | 'IN_PROGRESS') => {
            try {
              setTaskError(null);
              setTaskLoading(true);
              const token = localStorage.getItem('token');
              await updateTask(token!, task.id, { status });
              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status } : t));
              setSuccessMessage(status === 'COMPLETED' ? '¡Tarea marcada como completada!' : '¡Tarea en progreso!');
            } catch (err: any) {
              setTaskError(err.message || 'Error al cambiar el estado');
            } finally {
              setTaskLoading(false);
            }
          }}
          editing={editing}
          taskLoading={taskLoading}
        />
      </div>
      {taskError && (
        <AlertMessage
          message={taskError}
          type="error"
          onClose={() => setTaskError(null)}
          className="mt-3 fade-in"
        />
      )}
    </div>
  );
}

function App() {
  // Decodifica el token JWT para obtener el email
  function getUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { email: payload.email, avatarUrl: localStorage.getItem('avatarUrl') || undefined };
    } catch {
      return null;
    }
  }
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-custom mb-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-3">
            {user && (
              <UserMenu email={user.email} avatarUrl={user.avatarUrl} onLogout={handleLogout} />
            )}
            <span className="navbar-brand fw-bold text-light">Gestión de Tareas</span>
          </div>
          <div className="navbar-nav flex-row gap-2">
            <Link to="/login" className="nav-link text-light">Login</Link>
            <Link to="/register" className="nav-link text-light">Registro</Link>
            <Link to="/tasks" className="nav-link text-light">Tareas</Link>
          </div>
          <div><ThemeToggle /></div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><div className="card p-4" style={{ minWidth: 340, maxWidth: 400, width: '100%' }}><LoginPage /></div></div>} />
        <Route path="/register" element={<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><div className="card p-4" style={{ minWidth: 340, maxWidth: 400, width: '100%' }}><RegisterPage /></div></div>} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
    
  );
}

export default App;
