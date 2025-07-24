import { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function LoginForm({ onLogin, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !password) return;
    await onLogin(email, password);
  };

  const emailValid = email.includes('@') && email.includes('.');
  const passwordValid = password.length >= 6;

  return (
    <div className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: 320 }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-3">Iniciar Sesión</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`form-control ${touched && !emailValid ? 'is-invalid' : ''}`}
              autoComplete="username"
              required
            />
            {touched && !emailValid && (
              <div className="invalid-feedback">Email inválido</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`form-control ${touched && !passwordValid ? 'is-invalid' : ''}`}
              autoComplete="current-password"
              required
            />
            {touched && !passwordValid && (
              <div className="invalid-feedback">Mínimo 6 caracteres</div>
            )}
          </div>
          {error && <div className="alert alert-error mt-2">{error}</div>}
          <button type="submit" className="btn btn-custom w-100" disabled={loading || !emailValid || !passwordValid}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
