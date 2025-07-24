import type { Task } from '../services/tasks';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => Promise<void>;
  onStatusChange: (task: Task, status: 'COMPLETED' | 'IN_PROGRESS') => Promise<void>;
  editing?: boolean;
  taskLoading?: boolean;
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange, editing, taskLoading }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="alert alert-secondary mt-3">No tienes tareas registradas.</div>;
  }
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {tasks.map((task: Task) => (
        <div className="col" key={task.id}>
          <div className="card bg-dark text-light shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-0">{task.title}</h5>
                <span className={`badge bg-${task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning text-dark' : 'success'}`}>{task.priority === 'HIGH' ? 'Alta' : task.priority === 'MEDIUM' ? 'Media' : 'Baja'}</span>
              </div>
              <p className="card-text mb-2">{task.description}</p>
              <div className="mb-2">
                <span className={`badge ${task.status === 'COMPLETED' ? 'bg-success' : task.status === 'IN_PROGRESS' ? 'bg-info text-dark' : 'bg-secondary'}`}>{task.status === 'COMPLETED' ? 'Completada' : task.status === 'IN_PROGRESS' ? 'En progreso' : 'Pendiente'}</span>
              </div>
              {task.dueDate && <div className="mb-2"><small className="text-light">Vence: {new Date(task.dueDate).toLocaleDateString()}</small></div>}
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-custom flex-fill"
                  onClick={() => onEdit(task)}
                  disabled={editing}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger flex-fill"
                  onClick={() => onDelete(task)}
                  disabled={taskLoading || editing}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-outline-success flex-fill"
                  onClick={() => onStatusChange(task, 'COMPLETED')}
                  disabled={task.status === 'COMPLETED' || editing || taskLoading}
                  title="Marcar como completada"
                >
                  ✓ Completada
                </button>
                <button
                  className="btn btn-outline-info flex-fill"
                  onClick={() => onStatusChange(task, 'IN_PROGRESS')}
                  disabled={task.status === 'IN_PROGRESS' || editing || taskLoading}
                  title="Marcar como en progreso"
                >
                  ▶ En progreso
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
