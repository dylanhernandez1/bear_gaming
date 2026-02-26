import { useNavigate } from "react-router-dom";
import "./../styles.css";

export default function SettingsDrawer({ open, onClose }) {
    const navigate = useNavigate();

    const go = (path) => {
        onClose?.();
        if (path) navigate(path);
    };

    const logout = () => {
        localStorage.setItem("loggedIn", "false");
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
                👤
                </span>
                <span className="drawerName">{getUsername()}</span>
            </div>
            <button className="drawerClose" onClick={onClose} aria-label="Close settings" type="button">
                ✕
            </button>
            </div>

            <div className="drawerList">
            <DrawerItem icon="👤" label="Account" onClick={() => go("/profile")} />
            <DrawerItem icon="🛡️" label="Security and Privacy" onClick={() => {}} muted />
            <DrawerItem icon="🔖" label="Saved Games" onClick={() => go("/saved-games")} />
            <DrawerItem icon="✍️" label="Your Reviews" onClick={() => {}} muted />
            <DrawerItem icon="⏻" label="Logout" onClick={logout} danger />
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
        <span className="drawerItemIcon" aria-hidden="true">
            {icon}
        </span>
        <span className="drawerItemText">{label}</span>
        <span className="drawerItemChevron" aria-hidden="true">
            ›
        </span>
        </button>
    );
}

function getUsername() {
  try {
    const p = JSON.parse(localStorage.getItem("bg.profile") || "{}");
    return p.username || "yaneli";
  } catch {
    return "yaneli";
  }
}
