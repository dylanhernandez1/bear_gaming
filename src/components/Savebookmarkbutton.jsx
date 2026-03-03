import { useSavedGames } from "../context/Savedgamescontext.jsx";
import { useToast } from "../context/ToastContext";
import { games } from "../data/games/game.jsx";

export default function SaveBookmarkButton({ gameId, size = 22, style = {} }) {
  const { isSaved, toggleSave } = useSavedGames();
  const { showToast } = useToast();
  const saved = isSaved(gameId);

  const handleClick = (e) => {
    e.stopPropagation();
    const wasSaved = isSaved(gameId);
    toggleSave(gameId);

    const game = games.find((g) => g.id === gameId);
    const title = game?.title || gameId;

    if (!wasSaved) {
      showToast({
        message: `${title} has been added to your saved games!`,
        type: "save",
        navigateTo: "/saved-games",
      });
    } else {
      showToast({
        message: `${title} has been removed from your saved games.`,
        type: "remove",
        navigateTo: null,
      });
    }
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
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={saved ? "white" : "none"}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}