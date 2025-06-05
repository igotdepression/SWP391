import React from "react";

export default function Dashboard({ user, onLogout }) {
  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Roles:</strong>{" "}
            {user.roles && user.roles.length > 0
              ? user.roles.map((r) => r.name).join(", ")
              : "No roles"}
          </p>
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Không có user</p>
      )}
    </div>
  );
}
