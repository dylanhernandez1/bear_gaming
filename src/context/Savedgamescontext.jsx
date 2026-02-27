import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SavedGamesContext = createContext(null);

// Key is per-user so saved games don't bleed between accounts
function storageKey(username) {
  return `bg.savedGames.${username || "guest"}`;
}

function loadSaved(username) {
  try {
    const raw = localStorage.getItem(storageKey(username));
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getCurrentUsername() {
  try {
    const profile = JSON.parse(localStorage.getItem("bg.profile"));
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    return loggedIn && profile?.username ? profile.username : "guest";
  } catch {
    return "guest";
  }
}

export function SavedGamesProvider({ children }) {
  const [username, setUsername] = useState(getCurrentUsername);
  const [savedIds, setSavedIds] = useState(() => loadSaved(getCurrentUsername()));

  // Re-load saved games whenever the active user changes
  // (e.g. after login/logout without full page reload)
  useEffect(() => {
    const handleStorage = () => {
      const currentUser = getCurrentUsername();
      setUsername(currentUser);
      setSavedIds(loadSaved(currentUser));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(storageKey(username), JSON.stringify(savedIds));
  }, [savedIds, username]);

  const isSaved = useCallback(
    (id) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const removeSave = useCallback((id) => {
    setSavedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  // Call this after login/logout to reload the right user's saved games
  const refreshUser = useCallback(() => {
    const currentUser = getCurrentUsername();
    setUsername(currentUser);
    setSavedIds(loadSaved(currentUser));
  }, []);

  return (
    <SavedGamesContext.Provider
      value={{ savedIds, isSaved, toggleSave, removeSave, refreshUser, username }}
    >
      {children}
    </SavedGamesContext.Provider>
  );
}

export function useSavedGames() {
  const ctx = useContext(SavedGamesContext);
  if (!ctx) throw new Error("useSavedGames must be used inside SavedGamesProvider");
  return ctx;
}