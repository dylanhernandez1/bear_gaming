import { useFilters } from "../context/FilterContext";
import { games } from "../data/games/game.jsx";

// Collect all unique tags from game data
const ALL_TAGS = [...new Set(games.flatMap((g) => g.tags))].sort();

const PRICE_OPTIONS = [
  { label: "Any price", value: null },
  { label: "Free only", value: "free" },
  { label: "Under $10", value: 10 },
  { label: "Under $25", value: 25 },
  { label: "Under $50", value: 50 },
];

const RATING_OPTIONS = [0, 3, 3.5, 4, 4.5];

const HOURS_PRESETS = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under 20 hrs", min: 0, max: 20 },
  { label: "20 – 50 hrs", min: 20, max: 50 },
  { label: "50 – 100 hrs", min: 50, max: 100 },
  { label: "100+ hrs", min: 100, max: Infinity },
];

export default function FilterDrawer({ open, onClose }) {
  const { filters, updateFilters, resetFilters, hasActiveFilters } = useFilters();

  const toggleTag = (tag) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: next });
  };

  const currentHoursPreset = HOURS_PRESETS.findIndex(
    (p) => p.min === filters.minHours && p.max === filters.maxHours
  );

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 200,
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          width: "300px",
          background: "#12121f",
          borderRight: "1px solid #2a2a3e",
          zIndex: 201,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 20px 16px",
          borderBottom: "1px solid #2a2a3e",
          position: "sticky", top: 0,
          background: "#12121f",
          zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px" }}>🌪️</span>
            <span style={{ fontWeight: "700", fontSize: "16px", color: "white" }}>Filters</span>
            {hasActiveFilters && (
              <span style={{
                background: "#4a6fa5", color: "white",
                borderRadius: "10px", fontSize: "11px",
                padding: "2px 7px", fontWeight: "700",
              }}>ON</span>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  background: "transparent", border: "1px solid #444",
                  borderRadius: "8px", color: "#aaa", fontSize: "12px",
                  padding: "4px 10px", cursor: "pointer",
                }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: "transparent", border: "none",
                color: "#aaa", fontSize: "20px", cursor: "pointer",
                lineHeight: 1, padding: "0 4px",
              }}
            >×</button>
          </div>
        </div>

        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* ── Tags ── */}
          <section>
            <SectionLabel>Tags</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {ALL_TAGS.map((tag) => {
                const active = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      cursor: "pointer",
                      border: active ? "1px solid #4a6fa5" : "1px solid #444",
                      background: active ? "#1e3a5f" : "#1e1e30",
                      color: active ? "#7eb8f7" : "#ccc",
                      transition: "all 0.15s",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Min Rating ── */}
          <section>
            <SectionLabel>Minimum Rating</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {RATING_OPTIONS.map((r) => {
                const active = filters.minRating === r;
                return (
                  <button
                    key={r}
                    onClick={() => updateFilters({ minRating: r })}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "8px 12px", borderRadius: "8px",
                      border: active ? "1px solid #4a6fa5" : "1px solid transparent",
                      background: active ? "#1e3a5f" : "#1e1e30",
                      color: active ? "#7eb8f7" : "#ccc",
                      cursor: "pointer", textAlign: "left", fontSize: "14px",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>
                      {r === 0 ? "⭐ Any rating" : `${"★".repeat(Math.floor(r))}${r % 1 ? "½" : ""} ${r}+ stars`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Price ── */}
          <section>
            <SectionLabel>Max Price</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {PRICE_OPTIONS.map((opt) => {
                const active = filters.maxPrice === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => updateFilters({ maxPrice: opt.value })}
                    style={{
                      padding: "8px 12px", borderRadius: "8px",
                      border: active ? "1px solid #4a6fa5" : "1px solid transparent",
                      background: active ? "#1e3a5f" : "#1e1e30",
                      color: active ? "#7eb8f7" : "#ccc",
                      cursor: "pointer", textAlign: "left", fontSize: "14px",
                      transition: "all 0.15s",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Hours Played ── */}
          <section>
            <SectionLabel>Avg. Hours Played</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {HOURS_PRESETS.map((preset, i) => {
                const active = currentHoursPreset === i;
                return (
                  <button
                    key={preset.label}
                    onClick={() => updateFilters({ minHours: preset.min, maxHours: preset.max })}
                    style={{
                      padding: "8px 12px", borderRadius: "8px",
                      border: active ? "1px solid #4a6fa5" : "1px solid transparent",
                      background: active ? "#1e3a5f" : "#1e1e30",
                      color: active ? "#7eb8f7" : "#ccc",
                      cursor: "pointer", textAlign: "left", fontSize: "14px",
                      transition: "all 0.15s",
                    }}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: "11px", fontWeight: "700", color: "#666",
      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px",
    }}>
      {children}
    </div>
  );
}