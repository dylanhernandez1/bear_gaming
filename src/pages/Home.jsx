import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSearch } from "../context/SearchContext";
import { useFilters } from "../context/FilterContext";
import { games } from "../data/games/game.jsx";
import left_arrow from "../assets/left-arrow.png";
import right_arrow from "../assets/right-arrow.png";
import "./Home.css";

const width_size = 250;

// Parse a price string like "$25" or "Free" → number (0 for free, Infinity if unparseable)
function parsePrice(priceStr) {
  if (!priceStr) return Infinity;
  const lower = priceStr.toLowerCase().trim();
  if (lower === "free" || lower === "$0") return 0;
  const num = parseFloat(lower.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? Infinity : num;
}

// Get the minimum price across all platforms for a game
function getMinPrice(game) {
  if (!game.prices || game.prices.length === 0) return Infinity;
  return Math.min(...game.prices.map((p) => parsePrice(p.price)));
}

const Home = () => {
  const [position, setPosition] = useState(0);
  const dashboardRef = useRef(null);
  const { search } = useSearch();
  const { filters } = useFilters();
  const navigate = useNavigate();

  const filteredGames = games.filter((game) => {
    // Search
    if (!game.title.toLowerCase().includes(search.toLowerCase())) return false;

    // Tags — game must have ALL selected tags
    if (filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) => game.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    // Min rating
    if (filters.minRating > 0 && game.rating < filters.minRating) return false;

    // Max price
    if (filters.maxPrice !== null) {
      const minGamePrice = getMinPrice(game);
      if (filters.maxPrice === "free") {
        if (minGamePrice !== 0) return false;
      } else {
        if (minGamePrice > filters.maxPrice) return false;
      }
    }

    // Hours played range
    if (game.hoursPlayedAvg < filters.minHours) return false;
    if (filters.maxHours !== Infinity && game.hoursPlayedAvg > filters.maxHours) return false;

    return true;
  });

  const totalWidth = width_size * filteredGames.length;
  const visibleWidth = 2.5 * width_size;
  const max_position = Math.max(totalWidth - visibleWidth, 0);

  function onHandleClick(change_amount) {
    setPosition((prev) => {
      const new_position = prev + change_amount;
      if (new_position < 0) return 0;
      if (new_position > max_position) return max_position;
      return new_position;
    });
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="carousel">
          {/* LEFT BUTTON */}
          <button onClick={() => onHandleClick(-visibleWidth)}>
            <img src={left_arrow} alt="Clickable left button" className="slider-buttons" />
          </button>

          {/* GAME ROW */}
          <div
            className="row"
            ref={dashboardRef}
            style={{ transform: `translateX(-${position}px)` }}
          >
            {filteredGames.length === 0 ? (
              <div className="no-results">No games found.</div>
            ) : (
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="Slider"
                  onClick={() => navigate(`/game/${game.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={game.image} className="dashboard-image" alt={game.title} />
                  <div className="overlay">
                    <div className="overlay-text">{game.title}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT BUTTON */}
          <button onClick={() => onHandleClick(visibleWidth)}>
            <img src={right_arrow} alt="Clickable right button" className="slider-buttons" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;