import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SavedGamesContext = createContext(null);

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
    // Explicit guest flag takes priority — clears any stale login state
    if (localStorage.getItem("bg.guest") === "true") return "guest";

    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const profile = JSON.parse(localStorage.getItem("bg.profile"));
    return loggedIn && profile?.username ? profile.username : "guest";
  } catch {
    return "guest";
  }
}

export function SavedGamesProvider({ children }) {
  const [username, setUsername] = useState(getCurrentUsername);
  const [savedIds, setSavedIds] = useState(() => loadSaved(getCurrentUsername()));

  useEffect(() => {
    const handleStorage = () => {
      const currentUser = getCurrentUsername();
      setUsername(currentUser);
      setSavedIds(loadSaved(currentUser));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey(username), JSON.stringify(savedIds));
  }, [savedIds, username]);

  const isSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const removeSave = useCallback((id) => {
    setSavedIds((prev) => prev.filter((x) => x !== id));
  }, []);

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