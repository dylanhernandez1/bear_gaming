import { useState, useEffect } from "react";

/**
 * Returns the current display name: the logged-in username, or "guest".
 * Re-evaluates whenever localStorage changes (e.g. login / logout / guest).
 */
export function useCurrentUser() {
  const [displayName, setDisplayName] = useState(resolve);

  useEffect(() => {
    // Re-sync when another tab or component writes to localStorage
    const handler = () => setDisplayName(resolve());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return displayName;
}

function resolve() {
  try {
    if (localStorage.getItem("bg.guest") === "true") return "guest";
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const profile = JSON.parse(localStorage.getItem("bg.profile") || "{}");
    return loggedIn && profile?.username ? profile.username : "guest";
  } catch {
    return "guest";
  }
}