import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNavBar from "../components/Navbar.jsx";
import SaveBookmarkButton from "../components/Savebookmarkbutton.jsx";
import { useSavedGames } from "../context/Savedgamescontext.jsx";
import { games } from "../data/games/game.jsx";
import "../styles.css";

export default function SavedGames() {
  const { savedIds, username } = useSavedGames();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Join saved IDs against real game data so we always show up-to-date info
  const savedGames = useMemo(
    () => savedIds.map((id) => games.find((g) => g.id === id)).filter(Boolean),
    [savedIds]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return savedGames;
    return savedGames.filter((g) => g.title.toLowerCase().includes(q));
  }, [savedGames, query]);

  const isGuest = username === "guest";

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
                {/* Game cover image */}
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

                {/* Rating + hours pill */}
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

                {/* Bookmark toggle — top-right corner, unsaves on click */}
                <SaveBookmarkButton
                  gameId={game.id}
                  style={{ position: "absolute", top: "8px", right: "8px" }}
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