import React, { useState } from 'react';

interface UserMenuProps {
  email: string;
  avatarUrl?: string;
  onLogout: () => void;
}

export default function UserMenu({ email, avatarUrl, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(avatarUrl);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCurrentAvatar(reader.result);
          localStorage.setItem('avatarUrl', reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };  const handleRemoveAvatar = () => {
    setCurrentAvatar(undefined);
    localStorage.removeItem('avatarUrl');
  };

  // Renderiza el menú de usuario como un dropdown
  return (
    <div className="dropdown">
      {/* Botón principal que muestra el avatar y el email, y abre/cierra el menú */}
      <button
        className="btn btn-link p-0 d-flex align-items-center gap-2"
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* Imagen de avatar. Si no hay avatar personalizado, usa un generador basado en el email */}
        <img
          src={currentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=00d326&color=fff&size=32`}
          alt="avatar"
          className="rounded-circle border"
          style={{ width: 32, height: 32, objectFit: 'cover' }}
        />
        {/* Email del usuario visible solo en pantallas medianas o grandes */}
        <span className="d-none d-md-inline" style={{ fontWeight: 500 }}>{email}</span>
        {/* Flecha para indicar el menú desplegable */}
        <span className="ms-1">▼</span>
      </button>
      {/* Menú desplegable con opciones de usuario */}
      <ul className={`dropdown-menu${open ? ' show' : ''}`} style={{ minWidth: 200 }}>
        {/* Muestra el email en la parte superior del menú */}
        <li className="dropdown-item-text">
          <div className="fw-bold">{email}</div>
        </li>
        {/* Sección de previsualización y edición del avatar */}
        <li className="dropdown-item-text text-center">
          {/* Imagen de avatar ampliada */}
          <img
            src={currentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=00d326&color=fff&size=64`}
            alt="avatar-preview"
            className="rounded-circle border mb-2"
            style={{ width: 64, height: 64, objectFit: 'cover' }}
          />
          {/* Opciones para cambiar o quitar el avatar */}
          <div>
            {/* Botón para seleccionar una nueva imagen de avatar */}
            <button
              className="btn btn-sm btn-outline-secondary mt-1 me-1"
              onClick={() => fileInputRef.current?.click()}
            >
              Cambiar foto
            </button>
            {/* Si hay un avatar personalizado, muestra botón para quitarlo */}
            {currentAvatar && (
              <button
                className="btn btn-sm btn-outline-danger mt-1"
                onClick={handleRemoveAvatar}
              >
                Quitar
              </button>
            )}
            {/* Input oculto para cargar una imagen desde el sistema */}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </li>
        {/* Línea divisoria entre secciones del menú */}
        <li><hr className="dropdown-divider" /></li>
        {/* Botón para cerrar sesión */}
        <li>
          <button className="dropdown-item text-danger" onClick={onLogout}>Cerrar sesión</button>
        </li>
      </ul>
    </div>
    // Fin del menú de usuario
  );
}
