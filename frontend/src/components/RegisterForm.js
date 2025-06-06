import React, { useState } from "react";

export default function RegisterForm({ onRegister, setMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      roles: [{ name: role }],
    };
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        setMessage("Registration failed. Maybe email already exists.");
        return;
      }
      const data = await res.json();
      setMessage(`Registered successfully! Welcome ${data.email}`);
      onRegister(data);
    } catch {
      setMessage("Error during registration");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Register</h3>
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
      <div className="mb-2">
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_STAFF">Staff</option>
          <option value="ROLE_MANAGER">Manager</option>
          <option value="ROLE_GUEST">Guest</option>
        </select>
      </div>
      <button className="btn btn-success" type="submit">
        Register
      </button>
    </form>
  );
}
