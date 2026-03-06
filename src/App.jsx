  // src/App.jsx
 import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext.jsx";
import { SavedGamesProvider } from "./context/Savedgamescontext.jsx";
import { ToastProvider } from "./context/ToastContext";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile.jsx";
import SavedGames from "./pages/SavedGames.jsx";
import GamePage from "./pages/GamePage";

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, info: null };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error, info) {
      this.setState({ error, info });
      console.error("Uncaught error in App/ErrorBoundary:", error, info);
    }
    render() {
      if (this.state.error) {
        return (
          <div
            style={{
              padding: 24,
              color: "white",
              background: "#0b0b0b",
              minHeight: "100vh",
            }}
          >
            <h2 style={{ color: "#ffb3b3" }}>Something failed to render</h2>
            <p style={{ color: "#b3b3b3" }}>
              An error occurred while loading the app. Check the browser console
              and the terminal where `npm run dev` is running for the full stack
              trace.
            </p>
            <details style={{ color: "#ddd", whiteSpace: "pre-wrap" }}>
              {String(this.state.error && this.state.error.toString())}
              {"\n"}
              {this.state.info?.componentStack}
            </details>

            <p style={{ marginTop: 12 }}>
              <Link to="/" style={{ color: "#9d00ff" }}>
                Go to Home
              </Link>
            </p>
          </div>
        );
      }
      return this.props.children;
    }
  }

  function App() {
    return (
      <ToastProvider>
      <SavedGamesProvider>
      <FilterProvider>
      <SearchProvider>
      <div className="app">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved-games" element={<SavedGames />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route
              path="*"
              element={
                <div style={{ padding: 24 }}>
                  <h2 style={{ color: "white" }}>Page not found</h2>
                  <p style={{ color: "#b3b3b3" }}>
                    Try{" "}
                    <Link to="/" style={{ color: "#9d00ff" }}>
                      Home
                    </Link>{" "}
                    or{" "}
                    <Link to="/profile" style={{ color: "#9d00ff" }}>
                      Profile
                    </Link>
                    .
                  </p>
                </div>
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
      </SearchProvider>
      </FilterProvider>
      </SavedGamesProvider>
      </ToastProvider>
    );
  }

  export default App;
