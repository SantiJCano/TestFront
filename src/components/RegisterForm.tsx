import { useState } from 'react';

interface RegisterFormProps {
  onRegister: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function RegisterForm({ onRegister, loading, error }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [touched, setTouched] = useState(false);
  const emailValid = email.includes('@') && email.includes('.');
  const passwordValid = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !password || !firstName || !lastName) return;
    await onRegister({ email, password, firstName, lastName });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: 340 }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-3">Registro</h3>
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
              autoComplete="new-password"
              required
            />
            {touched && !passwordValid && (
              <div className="invalid-feedback">Mínimo 6 caracteres</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className={`form-control ${touched && !firstName ? 'is-invalid' : ''}`}
              required
            />
            {touched && !firstName && (
              <div className="invalid-feedback">El nombre es obligatorio</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className={`form-control ${touched && !lastName ? 'is-invalid' : ''}`}
              required
            />
            {touched && !lastName && (
              <div className="invalid-feedback">El apellido es obligatorio</div>
            )}
          </div>
          {error && <div className="alert alert-error mt-2">{error}</div>}
          <button type="submit" className="btn btn-custom w-100" disabled={loading || !emailValid || !passwordValid || !firstName || !lastName}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}
