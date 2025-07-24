export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function registerUser(data: RegisterData): Promise<void> {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al registrar usuario');
  }
}
