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

const Home = () => {
	const dashboardRef = useRef(null);
	const { search } = useSearch();
	const { filters, updateFilters } = useFilters();
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
	const removeTag = (tagToRemove) => {
		updateFilters({
			tags: filters.tags.filter((tag) => tag !== tagToRemove)
		});
	};
	// SCROLLING BEHAVIOR RIGHT HERE
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

	const handleRight = () => {
		setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
	};

	const handleLeft = () => {
		setCurrentIndex((prev) => Math.max(prev - 1, 0));
	};

	
	return (
		<>
		<Navbar />
			<div className="dashboard">
				{filters.tags.length > 0 && (
					<div className="active-tags">
					{filters.tags.map((tag) => (
						<span key={tag} className="tags">
							{tag}
							<span className="remove-tags" onClick={() => removeTag(tag)}>
								✕
							</span>
						</span>
					))}
					</div>
				)}
				<div className="carousel">
					<button onClick={handleLeft}>
						<img src={left_arrow} alt="Clickable left button" className="slider-buttons left" />
					</button>

					<div className="row" ref={dashboardRef}	
					style={{
						transform: `translateX(-${currentIndex * slider_movement}px)`
					}} >
						{filteredGames.length === 0 ? (
							<div className="no-results">No games found.</div>
						) : ( filteredGames.map((game) => (
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
							{/* Bookmark button — top-right corner of each card */}
							<SaveBookmarkButton
								gameId={game.id}
								style={{ position: "absolute", top: "8px", right: "8px" }}
							/>
						</div>
						)))}
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