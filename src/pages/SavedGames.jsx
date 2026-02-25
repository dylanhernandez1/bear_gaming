import { useEffect, useMemo, useState } from "react";
import LoggedInNavBar from "../components/NavBar.jsx";
import "../styles.css";

const DEFAULT_SAVED = [
  { id: "minecraft", title: "Minecraft", cover: "🟩" },
  { id: "amongus", title: "Among Us", cover: "🔴" },
];

export default function SavedGames() {
    const [saved, setSaved] = useState(() => {
        const existing = safeParse(localStorage.getItem("bg.savedGames"));
        return Array.isArray(existing) ? existing : [];
    });

    // Seed defaults once (hardcoded for prototype)
    useEffect(() => {
        if (saved.length === 0) {
        setSaved(DEFAULT_SAVED);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Persist
    useEffect(() => {
        localStorage.setItem("bg.savedGames", JSON.stringify(saved));
    }, [saved]);

    const [query, setQuery] = useState("");

    // Optional: read navbar search (stored) as a starting point
    useEffect(() => {
        const navQ = localStorage.getItem("bg.search") || "";
        if (navQ) setQuery(navQ);
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return saved;
        return saved.filter((g) => g.title.toLowerCase().includes(q));
    }, [saved, query]);

    return (
        <>
        <LoggedInNavBar />

        <main className="page">
            <div className="pageHeader">
            <h1 className="pageTitle">Saved Games</h1>

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

            <section className="gameGrid">
            {filtered.map((g) => (
                <article className="gameCard" key={g.id}>
                <div className="gameCover" aria-hidden="true">
                    {g.cover || "🎮"}
                </div>
                <div className="gameTitle">{g.title}</div>

                <div className="gameCardActions">
                    <button
                    className="chip"
                    type="button"
                    onClick={() => alert(`Open Game page later: ${g.id}`)}
                    >
                    View
                    </button>
                    <button
                    className="chip danger"
                    type="button"
                    onClick={() => setSaved((prev) => prev.filter((x) => x.id !== g.id))}
                    >
                    Remove
                    </button>
                </div>
                </article>
            ))}

            {filtered.length === 0 && (
                <div className="emptyState">
                No saved games match “{query}”.
                </div>
            )}
            </section>
        </main>
        </>
    );
}

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}