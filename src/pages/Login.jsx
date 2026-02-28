import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSavedGames } from "../context/Savedgamescontext";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useSavedGames();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    const saved = localStorage.getItem("bg.profile");
    if (!saved) {
      setError("No account found. Please sign up first.");
      return;
    }

    const profile = JSON.parse(saved);

    if (username.trim() !== profile.username) {
      setError("Invalid username.");
      return;
    }

    if (password !== profile.password) {
      setError("Invalid password.");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.removeItem("bg.guest");
    if (remember) localStorage.setItem("rememberedUser", profile.username);

    refreshUser();
    navigate("/home");
  };

  const handleGuest = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("rememberedUser");
    localStorage.setItem("bg.guest", "true");
    refreshUser();
    navigate("/home");
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Login</h1>

        {error && <p style={{ marginBottom: 12 }}>{error}</p>}

        <label className="label" htmlFor="login-username">Username</label>
        <input
          className="input"
          id="login-username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label" htmlFor="login-password">Password</label>
        <input
          className="input"
          id="login-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="checkboxRow" htmlFor="remember-me">
          <input
            id="remember-me"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>Remember Me</span>
        </label>

        <div className="linkGroup">
          <Link className="link" to="/signup">Sign Up</Link>
          <button
            className="link"
            type="button"
            onClick={handleGuest}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              font: "inherit",
              cursor: "pointer",
              textAlign: "left",
              display: "block",
              width: "fit-content",
            }}
          >
            Continue as Guest
          </button>
          <Link className="link" to="/forgot-password">Forgot Password</Link>
        </div>

        <button className="button primaryButton" type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;