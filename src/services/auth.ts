export interface LoginResponse {
  access_token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log('Login response:', response); // <-- Agrega esto
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log('Login error data:', errorData); // <-- Y esto
    throw new Error(errorData.message || 'Credenciales incorrectas');
  }
  return response.json();
}