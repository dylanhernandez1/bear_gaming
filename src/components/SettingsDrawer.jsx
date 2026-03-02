import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import BookMarkIcon from "./Icons/BookMarkIcon.jsx";
import "./../styles.css";

export default function SettingsDrawer({ open, onClose }) {
    const navigate = useNavigate();
    const username = useCurrentUser();
    const isGuest = username === "guest";

    const go = (path) => {
        onClose?.();
        if (path) navigate(path);
    };

    const logout = () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.removeItem("bg.guest");
        go("/login");
    };

    return (
        <>
        <div
            className={`drawerBackdrop ${open ? "open" : ""}`}
            onClick={onClose}
            role="button"
            tabIndex={-1}
            aria-hidden={!open}
        />

        <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
            <div className="drawerHeader">
                <div className="drawerUser">
                    <span className="drawerAvatar" aria-hidden="true">
                        {isGuest ? "🥷" : "👤"}
                    </span>
                    <div>
                        <span className="drawerName">{username}</span>
                        {isGuest && (
                            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
                                Browsing as guest
                            </div>
                        )}
                    </div>
                </div>
                <button className="drawerClose" onClick={onClose} aria-label="Close settings" type="button">
                    ✕
                </button>
            </div>

            <div className="drawerList">
                {isGuest ? (
                    <>
                        <DrawerItem icon="🔑" label="Log In" onClick={() => go("/login")} />
                        <DrawerItem icon="✏️" label="Sign Up" onClick={() => go("/signup")} />
                        <DrawerItem icon={<BookMarkIcon />} label="Saved Games" onClick={() => go("/saved-games")} />
                    </>
                ) : (
                    <>
                        <DrawerItem icon="👤" label="Account" onClick={() => go("/profile")} />
                        <DrawerItem icon={<BookMarkIcon />} label="Saved Games" onClick={() => go("/saved-games")} />
                        <DrawerItem icon="⏻" label="Logout" onClick={logout} danger />
                    </>
                )}
            </div>
        </aside>
        </>
    );
}

function DrawerItem({ icon, label, onClick, muted, danger }) {
    return (
        <button
            className={[
                "drawerItem",
                muted ? "muted" : "",
                danger ? "danger" : "",
            ].join(" ")}
            onClick={onClick}
            type="button"
            disabled={muted}
            aria-label={label}
        >
            <span className="drawerItemIcon" aria-hidden="true">{icon}</span>
            <span className="drawerItemText">{label}</span>
            <span className="drawerItemChevron" aria-hidden="true">›</span>
        </button>
    );
}