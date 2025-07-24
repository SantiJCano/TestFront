import React, { useState, useEffect } from 'react';

type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';

interface TaskFormProps {
  onCreate: (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string;
  }) => Promise<void>;
  onUpdate?: (data: {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string;
  }) => Promise<void>;
  initialData?: {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string;
  };
  isEditing?: boolean;
  loading: boolean;
  error: string | null;
}

export default function TaskForm({
  onCreate,
  onUpdate,
  initialData,
  isEditing,
  loading,
  error,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority || 'MEDIUM');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setPriority(initialData?.priority || 'MEDIUM');
    setDueDate(initialData?.dueDate || '');
  }, [initialData]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!title) return;
    if (isEditing && onUpdate) {
      await onUpdate({ title, description, priority, dueDate: dueDate || undefined });
      setSuccess(true);
    } else if (onCreate) {
      await onCreate({ title, description, priority, dueDate: dueDate || undefined });
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setDueDate('');
      setTouched(false);
      setSuccess(true);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-3">{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h3>
        <div className="mb-3">
          <label className="form-label">Título <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`form-control ${touched && !title ? 'is-invalid' : ''}`}
            required
          />
          {touched && !title && <div className="invalid-feedback">El título es obligatorio</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prioridad</label>
          <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="form-select">
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha límite</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="form-control"
          />
        </div>
        {success && (
          <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
            {isEditing ? '¡Tarea actualizada!' : '¡Tarea creada!'}
            <button type="button" className="btn-close ms-2" style={{ float: 'right' }} aria-label="Cerrar" onClick={() => setSuccess(false)}></button>
          </div>
        )}
        {error && <div className="alert alert-error mt-2">{error}</div>}
        <button type="submit" className="btn btn-custom w-100 d-flex justify-content-center align-items-center gap-2" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear tarea'}
        </button>
      </form>
    </div>
  );
}
