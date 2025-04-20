import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RecipeListPage from "./pages/RecipeListPage";
import PublicRecipePage from "./pages/PublicRecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import AdminImportPage from "./pages/AdminImportPage";
import ProfilePage from "./pages/Profile";
import { useAuth } from "./AuthProvider";

import logo from "./assets/logo.png";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  console.log("🧠 Logged in user:", user);
  console.log("🔒 isLoggedIn:", isLoggedIn);

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn && <li><Link to="/recipes">My Recipes</Link></li>}
          {isLoggedIn && <li><Link to="/add-recipe">Add Recipe</Link></li>}
          {isLoggedIn && <li><Link to="/profile">My Profile</Link></li>}
          {isLoggedIn && (
            <li>
              <button onClick={logout} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}>
                Logout
              </button>
            </li>
          )}
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
        </ul>
      </nav>

      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <header className="app-header">
          <div className="welcome-banner">
            <img src={logo} alt="Cookease Logo" className="logo" />
            <h1 style={{ margin: 0, color: "#001f3f" }}>Welcome to Cookease</h1>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<PublicRecipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recipes" element={isLoggedIn ? <RecipeListPage /> : <Navigate to="/login" />} />
        <Route path="/admin-import" element={isLoggedIn ? <AdminImportPage /> : <Navigate to="/login" />} />
        <Route path="/add-recipe" element={isLoggedIn ? <AddRecipePage /> : <Navigate to="/login" />} />
        <Route path="/recipe/:id" element={isLoggedIn ? <RecipeDetailPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;