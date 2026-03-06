import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSignUp = () => {
    setError("");

    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!username || !email || !password || !form.confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const profile = {
      name: username,
      email,
      username,
      password, 
      avatarDataUrl: "",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("bg.profile", JSON.stringify(profile));
    localStorage.setItem("loggedIn", "true");
    localStorage.removeItem("bg.guest"); 

    // If you added the auth-change listener in useCurrentUser:
    // window.dispatchEvent(new Event("auth-change"));

    navigate("/home");
  };

  return (
    <div className="page">
      <div className="card">
        <div className="backRow">
          <Link className="link backLink" to="/login" aria-label="Back to Login">
            ←
          </Link>
        </div>

        <h1 className="title">Create Account</h1>

        {error && <p style={{ marginTop: 8, marginBottom: 12 }}>{error}</p>}

        <label className="label" htmlFor="signup-username">Username</label>
        <input
          className="input"
          id="signup-username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={onChange}
        />

        <label className="label" htmlFor="signup-email">Email</label>
        <input
          className="input"
          id="signup-email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={onChange}
        />

        <label className="label" htmlFor="signup-password">Password</label>
        <input
          className="input"
          id="signup-password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={onChange}
        />

        <label className="label" htmlFor="signup-confirm-password">Confirm Password</label>
        <input
          className="input"
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={onChange}
        />

        <button className="button primaryButton" type="button" onClick={onSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
