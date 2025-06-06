import React, { useState } from "react";

export default function LoginForm({ onLogin, setMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        setMessage("Login failed. Check your email and password.");
        return;
      }
      const data = await res.json();
      setMessage(`Login success! Welcome back ${data.email}`);
      onLogin(data);
    } catch {
      setMessage("Error during login");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div className="mb-2">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
}
