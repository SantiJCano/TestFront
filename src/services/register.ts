export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function registerUser(data: RegisterData & { nombre?: string; apellido?: string }): Promise<void> {
  const API_URL = import.meta.env.VITE_API_URL;
  // Permitir ambos juegos de nombres
  const payload = {
    email: data.email,
    password: data.password,
    firstName: data.firstName || data.nombre || '',
    lastName: data.lastName || data.apellido || '',
  };
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al registrar usuario');
  }
}
