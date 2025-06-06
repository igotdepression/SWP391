import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

export default function Filler() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    setUser(null);
    setMessage("");
  };

  return (
    <Router>
      <div style={{ maxWidth: 500, margin: "auto", padding: "20px" }}>
        <h2 className="mb-4">Bloodline DNA Testing Service</h2>
        {message && (
          <p
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {message}
          </p>
        )}
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginForm onLogin={setUser} setMessage={setMessage} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterForm onRegister={setUser} setMessage={setMessage} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
