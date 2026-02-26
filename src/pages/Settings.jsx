import { useNavigate } from "react-router-dom";
import LoggedInNavBar from "../components/Navbar.jsx";
import "../styles.css";

export default function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    navigate("/login");
  };

  return (
    <>
      <LoggedInNavBar />
      <main className="page">
        <div className="card" style={{ maxWidth: 520 }}>
          <h1 className="title">Settings</h1>

          <button className="btnDanger" type="button" onClick={logout}>
            LOG OUT
          </button>
        </div>
      </main>
    </>
  );
}
