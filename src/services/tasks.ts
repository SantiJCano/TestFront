export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  status?: TaskStatus;
}

export async function deleteTask(id: string, token: string): Promise<void> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado. Inicia sesión nuevamente.');
    }
    throw new Error('Error al eliminar la tarea');
  }
}

export async function getTasks(token: string): Promise<Task[]> {
  const response = await fetch('${import.meta.env.VITE_API_URL}/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado. Inicia sesión nuevamente.');
    }
    throw new Error('Error al obtener tareas');
  }

  return response.json();
}

export async function updateTask(token: string, id: string, data: Partial<CreateTaskDto>): Promise<Task> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al actualizar la tarea');
  }
  return response.json();
}

export async function createTask(token: string, data: CreateTaskDto): Promise<Task> {
  const response = await fetch('${import.meta.env.VITE_API_URL}/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al crear la tarea');
  }
  return response.json();
}
