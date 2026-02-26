import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useFilters } from "../context/FilterContext";
import SettingsDrawer from "./SettingsDrawer.jsx";
import FilterDrawer from "./Filterdrawer.jsx";
import "./../styles.css";

export default function LoggedInNavBar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const closeDrawer = () => setDrawerOpen(false);
    const closeFilter = () => setFilterOpen(false);

    const { search, updateSearch } = useSearch();
    const { hasActiveFilters } = useFilters();

    useEffect(() => {
        localStorage.setItem("bg.search", search);
    }, [search]);

    const username = useMemo(() => {
        const p = safeParse(localStorage.getItem("bg.profile"));
        return p?.username || "user";
    }, []);

    return (
        <>
        <header className="topNav">
            <div className="topNavLeft">
            <button
                className="navIcon"
                onClick={() => {
                closeDrawer();
                closeFilter();
                navigate("/home");
                }}
                aria-label="Go to Home"
                title="Home"
                type="button"
            >
                🧸
            </button>

            {/* Filter button — badge shows when filters are active */}
            <button
                className="navIcon"
                aria-label="Filter"
                title="Filter"
                type="button"
                onClick={() => {
                    closeDrawer();
                    setFilterOpen((v) => !v);
                }}
                style={{ position: "relative" }}
            >
                🌪️
                {hasActiveFilters && (
                    <span style={{
                        position: "absolute",
                        top: "2px", right: "2px",
                        width: "8px", height: "8px",
                        borderRadius: "50%",
                        background: "#4a6fa5",
                        border: "2px solid #0f0f1a",
                        display: "block",
                    }} />
                )}
            </button>
            </div>

            <div className="topNavSearch">
          <span className="searchIcon">🔎</span>
          <input
            className="searchInput"
            value={search}
            onChange={(e) => {
              updateSearch(e.target.value);
              if (window.location.pathname !== "/home") {
                navigate("/home");
              }
            }}
            placeholder="Search"
          />
        </div>

            <div className="topNavRight">
            <span className="navHello" title="Signed in user">
                {username}
            </span>

            <Link
                className="navIconLink"
                to="/saved-games"
                aria-label="Saved Games"
                title="Saved Games"
                onClick={closeDrawer}
            >
                🔖
            </Link>

            <Link
                className="navIconLink"
                to="/profile"
                aria-label="Profile"
                title="Profile"
                onClick={closeDrawer}
            >
                👤
            </Link>

            <button
                className="navIcon"
                aria-label="Settings"
                title="Settings"
                type="button"
                onClick={() => {
                    closeFilter();
                    setDrawerOpen((v) => !v);
                }}
            >
                ⚙️
            </button>
            </div>
        </header>

        <FilterDrawer open={filterOpen} onClose={closeFilter} />
        <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />
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