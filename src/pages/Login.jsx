import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

function Login() {
  const navigate = useNavigate();

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
    if (remember) localStorage.setItem("rememberedUser", profile.username);

    navigate("/home");
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("rememberedUser");
    navigate("/home");
  };

  return (
    <div className="page">
      <div className="card">
        <AuthHeader title="Login" />

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
          <Link className="link" to="/home" onClick={handleContinueAsGuest}>
            Continue as Guest
          </Link>
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
