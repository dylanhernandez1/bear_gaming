import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useFilters } from "../context/FilterContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import SettingsDrawer from "./SettingsDrawer.jsx";
import FilterDrawer from "./Filterdrawer.jsx";
import BookMarkIcon from "./Icons/BookMarkIcon.jsx";
import "./../styles.css";

export default function LoggedInNavBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);
  const closeFilter = () => setFilterOpen(false);

  const { search, updateSearch } = useSearch();
  const { hasActiveFilters } = useFilters();
  const username = useCurrentUser();

  useEffect(() => {
    localStorage.setItem("bg.search", search);
  }, [search]);

  return (
    <>
      <header className="topNav">
        <div className="topNavLeft">
          <Link
            to="/home"
            className="navLogo"
            onClick={() => {
              closeDrawer();
              closeFilter();
            }}
            aria-label="Go to Home"
            title="Home"
          >
            <span className="navLogoIcon">🧸</span>
            <span className="navLogoText">Bear Gaming</span>
          </Link>

          <button
            className="navIconWithLabel"
            type="button"
            onClick={() => {
              closeDrawer();
              setFilterOpen((v) => !v);
            }}
            style={{ position: "relative" }}
          >
            <span className="navIconSymbol">🌪️</span>
            <span className="navIconText">Filter</span>

            {hasActiveFilters && (
              <span className="filterDot" />
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
            className="navIconWithLabel"
            to="/saved-games"
            onClick={closeDrawer}
          >
            <span className="navIconSymbol">
              <BookMarkIcon />
            </span>
            <span className="navIconText">Saved</span>
          </Link>

          <Link
            className="navIconWithLabel"
            to="/profile"
            onClick={closeDrawer}
          >
            <span className="navIconSymbol">👤</span>
            <span className="navIconText">Profile</span>
          </Link>

          <button
            className="navIconWithLabel"
            type="button"
            onClick={() => {
              closeFilter();
              setDrawerOpen((v) => !v);
            }}
          >
            <span className="navIconSymbol">⚙️</span>
            <span className="navIconText">Settings</span>
          </button>
        </div>
      </header>

      <FilterDrawer open={filterOpen} onClose={closeFilter} />
      <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
