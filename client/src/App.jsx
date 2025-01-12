import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultForm from "./pages/ResultForm";
import EventManagement from "./pages/EventManagement";
import EventResults from "./pages/EventResults";
import Dashboard from "./pages/Admin";
import WelcomePage from "./pages/Home";
import ItemsLeaderboard from "./pages/ItemsLeaderboard";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"; // Import your 404 page component
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      verifyToken(token);
    } else {
      setIsAuthenticated(false);
      setLoading(false); // Ensure loading is set to false when no token exists
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // Verify the token with the backend
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token verification failed", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading state regardless of success or failure
    }
  };

  if (loading) {
    // Render a loading spinner or fallback UI while authentication is being verified
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/event/:eventId" element={<Leaderboard />} />
        <Route path="/event/:eventId/programs" element={<ItemsLeaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:eventId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EventResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-event"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EventManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:eventId/add-result"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ResultForm />
            </ProtectedRoute>
          }
        />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
