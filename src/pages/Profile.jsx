import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNavBar from "../components/Navbar.jsx";
import "../styles.css";

export default function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const saved = safeParse(localStorage.getItem("bg.profile"));
    if (!loggedIn || !saved) navigate("/login");
  }, [navigate]);

  const [profile, setProfile] = useState(() => {
    return safeParse(localStorage.getItem("bg.profile"));
  });

  useEffect(() => {
    localStorage.setItem("bg.profile", JSON.stringify(profile));
  }, [profile]);

  const avatarStyle = useMemo(() => {
    if (!profile?.avatarDataUrl) return {};
    return { backgroundImage: `url(${profile.avatarDataUrl})` };
  }, [profile?.avatarDataUrl]);

  if (!profile) return null;

  const onUploadAvatar = async (file) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setProfile((p) => ({ ...p, avatarDataUrl: dataUrl }));
  };

  return (
    <>
      <LoggedInNavBar />

      <main className="page">
        <div className="profileGrid">
          <section className="card profileLeft">
            <div className="avatarWrap">
              <div
                className={`avatar ${profile.avatarDataUrl ? "hasImg" : ""}`}
                style={avatarStyle}
              >
                {!profile.avatarDataUrl && (
                  <span className="avatarPlaceholder">👤</span>
                )}
              </div>

              <label className="btn">
                Upload Profile Pic
                <input
                  type="file"
                  accept="image/*"
                  className="fileInput"
                  onChange={(e) => onUploadAvatar(e.target.files?.[0])}
                />
              </label>
            </div>

            <div className="nameRow">
              <h2 className="bigName">{profile.name}</h2>
              <button
                className="iconPill"
                type="button"
                title="Edit name"
                aria-label="Edit name"
                onClick={() => {
                  const next = prompt("Enter your display name:", profile.name);
                  if (next !== null && next.trim() !== "") {
                    setProfile((p) => ({ ...p, name: next.trim() }));
                  }
                }}
              >
                ✏️
              </button>
            </div>
          </section>

          <section className="card profileRight">
            <FieldRow
              label="Email"
              value={profile.email}
              buttonText="change email"
              onChange={() => {
                const next = prompt("Enter new email:", profile.email);
                if (next !== null && next.trim() !== "") {
                  setProfile((p) => ({ ...p, email: next.trim() }));
                }
              }}
            />

            <FieldRow
              label="User name"
              value={profile.username}
              buttonText="change username"
              onChange={() => {
                const next = prompt("Enter new username:", profile.username);
                if (next !== null && next.trim() !== "") {
                  setProfile((p) => ({ ...p, username: next.trim() }));
                }
              }}
            />

            <FieldRow
              label="Password"
              value={profile.password}
              buttonText="change password"
              onChange={() => {
                const next = prompt("Enter new password:", "");
                if (next !== null && next.trim() !== "") {
                  setProfile((p) => ({ ...p, password: next.trim() })); 
                }
              }}
              isPassword
            />

            <div className="profileActions">
              <button
                className="btnWide"
                type="button"
                onClick={() => navigate("/saved-games")}
              >
                YOUR SAVED GAMES 🔖
              </button>

              <button
                className="btnWide"
                type="button"
                onClick={() => navigate("/settings")}
              >
                Settings ⚙️
              </button>

              <button
                className="btnDanger"
                type="button"
                onClick={() => {
                  const ok = confirm(
                    "Delete account (prototype)? This clears local data.",
                  );
                  if (!ok) return;
                  localStorage.removeItem("bg.profile");
                  localStorage.removeItem("bg.savedGames");
                  localStorage.setItem("loggedIn", "false");
                  navigate("/login");
                }}
              >
                DELETE YOUR ACCOUNT
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function FieldRow({ label, value, buttonText, onChange, isPassword }) {
  return (
    <div className="fieldRow">
      <div className="fieldLabel">{label}</div>
      <div className="fieldInputWrap">
        <div className={`fakeInput ${isPassword ? "password" : ""}`}>
          {isPassword ? "********" : value}
        </div>
        <button className="linkBtn" type="button" onClick={onChange}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
