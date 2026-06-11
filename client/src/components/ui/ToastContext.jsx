import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, opts = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const toast = { id, msg, type: opts.type || 'info', timeout: opts.timeout || 4000 };
    setToasts((t) => [toast, ...t]);
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), toast.timeout);
    return id;
  }, []);

  const removeToast = useCallback((id) => setToasts((t) => t.filter(x => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="zentrax-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`zentrax-toast ${t.type === 'success' ? 'success' : t.type === 'error' ? 'error' : ''}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(){
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
