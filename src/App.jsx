import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import SavedGames from "./pages/SavedGames.jsx";

export default function App() {
    return (
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-games" element={<SavedGames />} />
        </Routes>
    );
}
