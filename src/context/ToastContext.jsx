import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = "save", navigateTo }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, navigateTo }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div style={{
      position: "fixed",
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      pointerEvents: "none",
    }}>
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  const navigate = useNavigate();
  const isSave = toast.type === "save";

  const handleClick = () => {
    onDismiss(toast.id);
    if (toast.navigateTo) navigate(toast.navigateTo);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 20px",
        background: "#12121f",
        border: "1px solid #2a2a4e",
        borderTop: `3px solid ${isSave ? "#4a6fa5" : "#6b3a3a"}`,
        borderRadius: "10px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,111,165,0.1)",
        cursor: "pointer",
        maxWidth: "360px",
        minWidth: "280px",
        position: "relative",
        overflow: "hidden",
        pointerEvents: "all",
        animation: "toastSlideDown 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "32px", height: "32px",
        borderRadius: "8px",
        background: isSave ? "rgba(74,111,165,0.2)" : "rgba(107,58,58,0.2)",
        border: `1px solid ${isSave ? "rgba(74,111,165,0.3)" : "rgba(107,58,58,0.3)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24"
          fill={isSave ? "#4a6fa5" : "none"}
          stroke={isSave ? "#7eb8f7" : "#e07070"}
          strokeWidth="1.5"
        >
          {isSave
            ? <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            : <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2zM9 10h6" />
          }
        </svg>
      </div>

      {/* Message + hint */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "13.5px", color: "#ddd", lineHeight: "1.4" }}>
          {toast.message}
        </div>
        {isSave && (
          <div style={{ fontSize: "11px", color: "#4a6fa5", marginTop: "3px" }}>
            Click to view saved games →
          </div>
        )}
      </div>

      {/* Dismiss × */}
      <span
        onClick={(e) => { e.stopPropagation(); onDismiss(toast.id); }}
        style={{ fontSize: "16px", color: "#555", flexShrink: 0, lineHeight: 1, cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
      >
        ×
      </span>

      {/* Progress bar */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0,
        height: "2px",
        background: isSave
          ? "linear-gradient(90deg, #4a6fa5, #7eb8f7)"
          : "linear-gradient(90deg, #6b3a3a, #e07070)",
        animation: "toastProgress 3.5s linear forwards",
      }} />

      <style>{`
        @keyframes toastSlideDown {
          from { opacity: 0; transform: translateY(-16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}