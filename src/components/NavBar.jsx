import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingsDrawer from "./SettingsDrawer.jsx";
import "./../styles.css";

export default function LoggedInNavBar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const closeDrawer = () => setDrawerOpen(false);

    const [search, setSearch] = useState(() => localStorage.getItem("bg.search") || "");
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
                navigate("/home");
                }}
                aria-label="Go to Home"
                title="Home"
                type="button"
            >
                🧸
            </button>

            <button className="navIcon" aria-label="Filter" title="Filter" type="button">
                🌪️
            </button>
            </div>

            <div className="topNavSearch">
            <span className="searchIcon" aria-hidden="true">
                🔎
            </span>
            <input
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
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
                onClick={() => setDrawerOpen((v) => !v)}
            >
                ⚙️
            </button>
            </div>
        </header>

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
