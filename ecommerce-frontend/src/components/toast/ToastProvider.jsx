
import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type = "info", message = "", timeout = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    if (timeout) setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), timeout);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter(x => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div style={{ position: "fixed", top: 80, right: 20, zIndex: 1070 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast show align-items-center text-white bg-${t.type} mb-2`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ minWidth: 220 }}
          >
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => removeToast(t.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
