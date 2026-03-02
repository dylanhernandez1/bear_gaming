import { useSavedGames } from "../context/Savedgamescontext";
import BookMarkIcon from "./Icons/BookMarkIcon";

export default function SaveBookmarkButton({ gameId, size = 22, style = {} }) {
  const { isSaved, toggleSave } = useSavedGames();
  const saved = isSaved(gameId);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleSave(gameId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={saved ? "Remove from saved" : "Save game"}
      aria-label={saved ? "Remove from saved" : "Save game"}
      style={{
        background: saved ? "rgba(74,111,165,0.85)" : "rgba(20,20,35,0.75)",
        border: saved ? "1px solid #4a6fa5" : "1px solid rgba(255,255,255,0.15)",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + 12,
        height: size + 12,
        padding: 0,
        backdropFilter: "blur(4px)",
        transition: "background 0.18s, border 0.18s, transform 0.12s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <BookMarkIcon size={size} filled={saved} />
    </button>
  );
}
