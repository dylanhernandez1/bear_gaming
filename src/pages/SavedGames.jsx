import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNavBar from "../components/Navbar.jsx";
import SaveBookmarkButton from "../components/Savebookmarkbutton.jsx";
import { useSavedGames } from "../context/Savedgamescontext.jsx";
import { useToast } from "../context/ToastContext";
import { games } from "../data/games/game.jsx";
import "../styles.css";

export default function SavedGames() {
  const { savedIds, username, toggleSave } = useSavedGames();
  const { showToast, dismiss } = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [pendingRemovals, setPendingRemovals] = useState(() => new Set());
  const pendingTimeouts = useRef({});
  const pendingToastIds = useRef({});

  useEffect(() => {
    return () => {
      Object.values(pendingTimeouts.current).forEach((id) => clearTimeout(id));
    };
  }, []);

  const savedGames = useMemo(
    () =>
      savedIds
        .map((id) => games.find((g) => g.id === id))
        .filter(Boolean)
        .filter((g) => !pendingRemovals.has(g.id)),
    [savedIds, pendingRemovals]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return savedGames;
    return savedGames.filter((g) => g.title.toLowerCase().includes(q));
  }, [savedGames, query]);

  const isGuest = username === "guest";

  const cancelPendingRemoval = (gameId) => {
    clearTimeout(pendingTimeouts.current[gameId]);
    delete pendingTimeouts.current[gameId];

    dismiss(pendingToastIds.current[gameId]);
    delete pendingToastIds.current[gameId];

    setPendingRemovals((prev) => {
      const next = new Set(prev);
      next.delete(gameId);
      return next;
    });
  };

  const finalizeRemoval = (gameId) => {
    toggleSave(gameId);
    delete pendingTimeouts.current[gameId];
    delete pendingToastIds.current[gameId];
    setPendingRemovals((prev) => {
      const next = new Set(prev);
      next.delete(gameId);
      return next;
    });
  };

  const handlePendingRemove = ({ gameId, title }) => {
    if (pendingRemovals.has(gameId)) return;

    const gameTitle = title || games.find((g) => g.id === gameId)?.title || gameId;

    setPendingRemovals((prev) => new Set(prev).add(gameId));

    const timeoutId = setTimeout(() => finalizeRemoval(gameId), 3500);
    pendingTimeouts.current[gameId] = timeoutId;

    const toastId = showToast({
      message: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span><strong style={{ color: "white" }}>{gameTitle}</strong> removed from saved games</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              cancelPendingRemoval(gameId);
            }}
            style={{
              background: "transparent",
              border: "1px solid #3a3a5e",
              color: "#cfd6f6",
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "999px",
              cursor: "pointer",
              lineHeight: 1.2,
            }}
            onMouseEnter={(event) => (event.currentTarget.style.borderColor = "#5a6fb0")}
            onMouseLeave={(event) => (event.currentTarget.style.borderColor = "#3a3a5e")}
          >
            Undo
          </button>
        </span>
      ),
      type: "remove",
      navigateTo: null,
    });

    pendingToastIds.current[gameId] = toastId;
  };

  return (
    <>
      <LoggedInNavBar />

      <main className="saved-page">
        <div className="pageHeader">
          <div>
            <h1 className="pageTitle">Saved Games</h1>
            {isGuest ? (
              <p style={{ color: "#888", fontSize: "13px", margin: "4px 0 0" }}>
                Browsing as guest —{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ color: "#7eb8f7", cursor: "pointer", textDecoration: "underline" }}
                >
                  log in
                </span>{" "}
                to keep your saves across devices.
              </p>
            ) : (
              <p style={{ color: "#888", fontSize: "13px", margin: "4px 0 0" }}>
                Saved as <strong style={{ color: "#ccc" }}>@{username}</strong>
              </p>
            )}
          </div>

          <div className="savedSearchBar">
            <span aria-hidden="true">🔎</span>
            <input
              className="savedSearchInput"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Saved Games"
              aria-label="Search Saved Games"
            />
          </div>
        </div>

        {savedGames.length === 0 ? (
          <div className="emptyState" style={{ marginTop: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔖</div>
            <p style={{ color: "#888", fontSize: "16px" }}>No saved games yet.</p>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Hit the bookmark icon on any game to save it here.
            </p>
          </div>
        ) : (
          <section className="gameGrid">
            {filtered.map((game) => (
              <article
                key={game.id}
                className="gameCard"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <div
                  className="gameCover"
                  style={{ padding: 0, overflow: "hidden", background: "#1a1a2e" }}
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div className="gameTitle">{game.title}</div>

                <div style={{ display: "flex", gap: "8px", padding: "0 12px 4px", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: "12px", color: "#f5c518", background: "#1e1e30",
                    borderRadius: "10px", padding: "2px 8px",
                  }}>
                    ★ {game.rating}
                  </span>
                  <span style={{
                    fontSize: "12px", color: "#aaa", background: "#1e1e30",
                    borderRadius: "10px", padding: "2px 8px",
                  }}>
                    ~{game.hoursPlayedAvg}h
                  </span>
                </div>

                <div className="gameCardActions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="chip"
                    type="button"
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    View
                  </button>
                </div>

                <SaveBookmarkButton
                  gameId={game.id}
                  style={{ position: "absolute", top: "8px", right: "8px" }}
                  onPendingRemove={handlePendingRemove}
                />
              </article>
            ))}

            {filtered.length === 0 && savedGames.length > 0 && (
              <div className="emptyState">No saved games match "{query}".</div>
            )}
          </section>
        )}
      </main>
    </>
  );
}