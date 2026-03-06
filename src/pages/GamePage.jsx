import { useParams } from "react-router-dom";
import { useState} from "react";
import Navbar from "../components/Navbar";
import SaveBookmarkButton from "../components/Savebookmarkbutton.jsx";
import { games } from "../data/games/game.jsx";

const StarRating = ({ rating, max = 5 }) => (
  <span style={{ display: "inline-flex", gap: "2px" }}>
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} style={{ color: i < Math.round(rating) ? "#f5c518" : "#555", fontSize: "18px" }}>
        ★
      </span>
    ))}
  </span>
);

function getStoredUsername() {
  try {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const profile = JSON.parse(localStorage.getItem("bg.profile"));
    return loggedIn && profile?.username ? profile.username : "guest";
  } catch {
    return "guest";
  }
}

const WriteReviewModal = ({ game, onClose, onSubmit }) => {
  const username = getStoredUsername();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [platform, setPlatform] = useState(game.prices?.[0]?.platform || "");
  const [hovered, setHovered] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit({ user: isAnonymous ? "Anonymous" : username, comment, rating, platform });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1a1a2e", border: "1px solid #333", borderRadius: "16px",
          padding: "32px", width: "100%", maxWidth: "480px", color: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h2 style={{ margin: "0 0 24px", fontSize: "22px" }}>✏️ Write a Review</h2>

        {/* Username — always visible, never editable */}
        <label style={labelStyle}>Posting as</label>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 14px", marginBottom: "16px",
          background: "#0f0f1a", border: "1px solid #2a2a3e",
          borderRadius: "8px", opacity: isAnonymous ? 0.4 : 1,
          transition: "opacity 0.2s",
        }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "#2a2a4e", border: "1px solid #444",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
            flexShrink: 0,
          }}>👤</div>
          <span style={{
            fontSize: "15px", fontWeight: "600",
            color: isAnonymous ? "#666" : "white",
            textDecoration: isAnonymous ? "line-through" : "none",
            transition: "color 0.2s",
          }}>
            @{username}
          </span>
          <span style={{
            marginLeft: "auto", fontSize: "11px", color: "#555",
            fontStyle: "italic",
          }}>
            read-only
          </span>
        </div>

        {/* Anonymous toggle */}
        <div
          onClick={() => setIsAnonymous((prev) => !prev)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginBottom: "16px", cursor: "pointer", userSelect: "none",
          }}
        >
          <div style={{
            width: "36px", height: "20px", borderRadius: "10px",
            background: isAnonymous ? "#4a6fa5" : "#333",
            position: "relative", transition: "background 0.2s", flexShrink: 0,
          }}>
            <div style={{
              position: "absolute", top: "3px",
              left: isAnonymous ? "19px" : "3px",
              width: "14px", height: "14px", borderRadius: "50%",
              background: "white", transition: "left 0.2s",
            }} />
          </div>
          <span style={{ fontSize: "13px", color: isAnonymous ? "#7eb8f7" : "#aaa" }}>
            Post anonymously
          </span>
        </div>

        <label style={labelStyle}>Platform</label>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {game.prices?.map((p, i) => <option key={i} value={p.platform}>{p.platform}</option>)}
        </select>

        <label style={labelStyle}>Rating</label>
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              style={{ fontSize: "28px", cursor: "pointer", color: star <= (hovered || rating) ? "#f5c518" : "#555", transition: "color 0.15s" }}
            >★</span>
          ))}
          <span style={{ alignSelf: "center", color: "#aaa", fontSize: "14px" }}>{rating}/5</span>
        </div>

        <label style={labelStyle}>Comment</label>
        <textarea
          value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..." rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <button onClick={handleSubmit} style={submitBtnStyle}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: "600", color: "#aaa",
  marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px",
};
const inputStyle = {
  width: "100%", background: "#0f0f1a", border: "1px solid #333", borderRadius: "8px",
  color: "white", padding: "10px 14px", fontSize: "15px", marginBottom: "16px",
  boxSizing: "border-box", outline: "none",
};
const cancelBtnStyle = {
  flex: 1, padding: "12px", background: "transparent", border: "1px solid #444",
  borderRadius: "8px", color: "#aaa", fontSize: "15px", cursor: "pointer",
};
const submitBtnStyle = {
  flex: 2, padding: "12px", background: "#4a6fa5", border: "none",
  borderRadius: "8px", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer",
};

const GamePage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [extraReviews, setExtraReviews] = useState(() => {
    if (!id) return [];
    try {
      const saved = localStorage.getItem(`reviews_${id}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load reviews", e);
      return [];
    }
  });

  const game = games.find((g) => g.id === id);

  if (!game) return <h2>Game not found</h2>;

  const allReviews = [...extraReviews, ...(game.reviews || [])];
	const calculateRating = 
		allReviews.length > 0 ? 
			( allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : game.rating;
  const handleReviewSubmit = (review) => {
    const updated = [review, ...extraReviews];
    setExtraReviews(updated);
    try {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save review", e);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px 48px", color: "white", maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
          <div style={{
            width: "320px", flexShrink: 0,
            borderRight: "1px solid #2a2a3e",
            paddingRight: "36px", paddingBottom: "32px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>
                {game.title}
              </h1>
              <SaveBookmarkButton gameId={game.id} size={20} />
            </div>

            <img
              src={game.image}
              alt={game.title}
              style={{
                width: "100%", aspectRatio: "1 / 1", objectFit: "cover",
                borderRadius: "12px", display: "block",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            />
          </div>

          <div style={{ flex: 1, paddingLeft: "36px", paddingBottom: "32px" }}>
            <h3 style={sectionHeader}>Tags</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {game.tags.map((tag, i) => <span key={i} style={tagStyle}>{tag}</span>)}
            </div>

            <h3 style={sectionHeader}>Description</h3>
            <p style={{ color: "#ccc", lineHeight: "1.6", marginBottom: "24px", fontSize: "15px" }}>
              {game.description}
            </p>

            <h3 style={sectionHeader}>Rating</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <StarRating rating={calculateRating} />
              <span style={{ fontWeight: "700", fontSize: "18px" }}>{calculateRating}/5</span>
            </div>
            <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "24px" }}>
              Users play this game for an average of{" "}
              <strong style={{ color: "white" }}>{game.hoursPlayedAvg}</strong> quality hours.
            </p>

            <h3 style={sectionHeader}>Price</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
              {game.prices.map((p, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <a
                    href={p.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#7eb8f7", textDecoration: "none", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#aad4ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#7eb8f7")}
                  >
                    <strong style={{ color: "white" }}>{p.price}</strong> on {p.platform} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #2a2a3e", margin: "0 0 32px" }} />

        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ ...sectionHeader, margin: 0 }}>Reviews</h3>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#2a2a3e", border: "1px solid #444", borderRadius: "20px",
                color: "white", padding: "8px 18px", fontSize: "14px", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3a3a5e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2a2a3e")}
            >
              ✏️ Write a Review
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {allReviews.length === 0 && (
              <p style={{ color: "#666", fontSize: "14px" }}>No reviews yet. Be the first!</p>
            )}
            {allReviews.map((review, i) => (
              <div
                key={i}
                style={{
                  background: "#1a1a2e", border: "1px solid #2a2a3e",
                  borderRadius: "12px", padding: "20px 24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: "#2a2a4e", border: "1px solid #444",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                    }}>👤</div>
                    <span style={{ fontWeight: "600", fontSize: "15px" }}>@{review.user}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <StarRating rating={review.rating} />
                    <span style={{ color: "#aaa", fontSize: "14px" }}>{review.rating}/5</span>
                  </div>
                </div>
                <p style={{ color: "#ccc", margin: "0 0 10px", lineHeight: "1.5", fontSize: "15px" }}>
                  {review.comment}
                </p>
                {review.platform && (
                  <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>— from {review.platform}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <WriteReviewModal
          game={game}
          onClose={() => setShowModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

const sectionHeader = {
  fontSize: "17px", fontWeight: "700", margin: "0 0 10px",
  color: "white", letterSpacing: "0.3px",
};
const tagStyle = {
  padding: "5px 14px", background: "#2a2a3e", border: "1px solid #444",
  borderRadius: "20px", fontSize: "13px", color: "#ddd",
};

export default GamePage;