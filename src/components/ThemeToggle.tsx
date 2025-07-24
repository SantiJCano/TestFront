import React from 'react';

// Componente funcional para alternar entre modo oscuro y claro
export default function ThemeToggle() {
  const [dark, setDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  React.useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className={`btn btn-outline-secondary ms-2`}
      style={{ borderRadius: '2em', fontWeight: 500 }}
      onClick={() => setDark(v => !v)}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? '🌙 Oscuro' : '☀️ Claro'}
    </button>
  );
}
