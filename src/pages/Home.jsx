import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SaveBookmarkButton from "../components/Savebookmarkbutton.jsx";
import { useSearch } from "../context/SearchContext";
import { useFilters } from "../context/FilterContext";
import { games } from "../data/games/game.jsx";
import left_arrow from "../assets/left-arrow.png";
import right_arrow from "../assets/right-arrow.png";
import "./Home.css";

function parsePrice(priceStr) {
  if (!priceStr) return Infinity;
  const lower = priceStr.toLowerCase().trim();
  if (lower === "free" || lower === "$0") return 0;
  const num = parseFloat(lower.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? Infinity : num;
}

function getMinPrice(game) {
  if (!game.prices || game.prices.length === 0) return Infinity;
  return Math.min(...game.prices.map((p) => parsePrice(p.price)));
}

// Build a human-readable label for each active filter
function getActiveFilterChips(filters) {
  const chips = [];

  filters.tags.forEach((tag) => {
    chips.push({ key: `tag:${tag}`, label: tag, clear: (f, u) => u({ tags: f.tags.filter((t) => t !== tag) }) });
  });

  if (filters.minRating > 0) {
    const stars = "★".repeat(Math.floor(filters.minRating)) + (filters.minRating % 1 ? "½" : "");
    chips.push({
      key: "rating",
      label: `${stars} ${filters.minRating}+ stars`,
      clear: (_, u) => u({ minRating: 0 }),
    });
  }

  if (filters.maxPrice !== null) {
    const label = filters.maxPrice === "free" ? "Free only" : `Under $${filters.maxPrice}`;
    chips.push({ key: "price", label, clear: (_, u) => u({ maxPrice: null }) });
  }

  const hasHours = filters.minHours > 0 || filters.maxHours !== Infinity;
  if (hasHours) {
    let label;
    if (filters.minHours === 0 && filters.maxHours !== Infinity) label = `Under ${filters.maxHours} hrs`;
    else if (filters.minHours > 0 && filters.maxHours === Infinity) label = `${filters.minHours}+ hrs`;
    else label = `${filters.minHours}–${filters.maxHours} hrs`;
    chips.push({ key: "hours", label, clear: (_, u) => u({ minHours: 0, maxHours: Infinity }) });
  }

  return chips;
}

const Home = () => {
  const dashboardRef = useRef(null);
  const { search } = useSearch();
  const { filters, updateFilters, resetFilters, hasActiveFilters } = useFilters();
  const navigate = useNavigate();

  const filteredGames = games.filter((game) => {
    if (!game.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.tags.length > 0) {
      if (!filters.tags.every((tag) => game.tags.includes(tag))) return false;
    }
    if (filters.minRating > 0 && game.rating < filters.minRating) return false;
    if (filters.maxPrice !== null) {
      const minGamePrice = getMinPrice(game);
      if (filters.maxPrice === "free") {
        if (minGamePrice !== 0) return false;
      } else {
        if (minGamePrice > filters.maxPrice) return false;
      }
    }
    if (game.hoursPlayedAvg < filters.minHours) return false;
    if (filters.maxHours !== Infinity && game.hoursPlayedAvg > filters.maxHours) return false;
    return true;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filters, search]);

  const card_width = 300;
  const gap = 32;
  const slider_movement = card_width + gap;
  const containerWidth = window.innerWidth;
  const visibleCards = Math.floor(containerWidth / slider_movement);
  const maxIndex = Math.max(filteredGames.length - visibleCards, 0);

  const handleRight = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const handleLeft = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const activeChips = getActiveFilterChips(filters);

  return (
    <>
      <Navbar />
      <div className="dashboard">

        {/* ── Active filters bar ── */}
        {hasActiveFilters && (
          <div className="active-tags" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{
              fontSize: "12px", fontWeight: "700", color: "#666",
              textTransform: "uppercase", letterSpacing: "0.8px",
              whiteSpace: "nowrap",
            }}>
              Filters applied:
            </span>

            {activeChips.map((chip) => (
              <span key={chip.key} className="tags">
                {chip.label}
                <span
                  className="remove-tags"
                  onClick={() => chip.clear(filters, updateFilters)}
                >
                  ✕
                </span>
              </span>
            ))}

            {/* Clear all — only shown when 2+ filters active */}
            {activeChips.length > 1 && (
              <button
                onClick={resetFilters}
                style={{
                  background: "transparent",
                  border: "1px solid #444",
                  borderRadius: "20px",
                  color: "#888",
                  fontSize: "12px",
                  padding: "3px 10px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Clear all
              </button>
            )}
          </div>
        )}

        <div className="carousel">
          <button onClick={handleLeft}>
            <img src={left_arrow} alt="Clickable left button" className="slider-buttons left" />
          </button>

          <div
            className="row"
            ref={dashboardRef}
            style={{ transform: `translateX(-${currentIndex * slider_movement}px)` }}
          >
            {filteredGames.length === 0 ? (
              <div className="no-results">No games found.</div>
            ) : (
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="Slider"
                  onClick={() => navigate(`/game/${game.id}`)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <img src={game.image} className="dashboard-image" alt={game.title} />
                  <div className="overlay">
                    <div className="overlay-text">{game.title}</div>
                  </div>
                  <SaveBookmarkButton
                    gameId={game.id}
                    style={{ position: "absolute", top: "8px", right: "8px" }}
                  />
                </div>
              ))
            )}
          </div>

          <button onClick={handleRight}>
            <img src={right_arrow} alt="Clickable right button" className="slider-buttons right" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;