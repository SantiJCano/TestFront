import React from 'react';

interface AlertMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  autoHideMs?: number;
  onClose?: () => void;
  className?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type = 'info', autoHideMs, onClose, className = '' }) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHideMs && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, autoHideMs);
      return () => clearTimeout(timer);
    }
  }, [autoHideMs, visible, onClose]);

  if (!visible) return null;

  let alertClass = 'alert ';
  switch (type) {
    case 'success':
      alertClass += 'alert-success'; break;
    case 'error':
      alertClass += 'alert-error'; break;
    case 'warning':
      alertClass += 'alert-warning'; break;
    default:
      alertClass += 'alert-info';
  }

  return (
    <div className={`${alertClass} alert-dismissible fade show mt-2 ${className}`} role="alert" style={{ minWidth: 220 }}>
      {message}
      {onClose && (
        <button type="button" className="btn-close ms-2" aria-label="Cerrar" onClick={() => { setVisible(false); if (onClose) onClose(); }} />
      )}
    </div>
  );
};

export default AlertMessage;
