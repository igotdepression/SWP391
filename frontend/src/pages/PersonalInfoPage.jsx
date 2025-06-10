import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalInfoPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would make an API call to save the user's information
    // For now, we'll simulate a delay and then navigate
    setTimeout(() => {
      setIsLoading(false);
      alert('Information saved successfully!');
      navigate('/home');
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#dbeafe", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: 480, 
        padding: 32, 
        borderRadius: 14, 
        boxShadow: "0 4px 24px rgba(0,0,0,0.09)", 
        background: "#fff" 
      }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: "bold", 
          marginBottom: 20, 
          color: "#2563eb" 
        }}>
          Complete Your Profile
        </h2>
        
        <p style={{ 
          marginBottom: 24, 
          color: "#475569", 
          fontSize: 15,
          lineHeight: 1.5
        }}>
          Welcome, {user?.fullName || "User"}! Please provide your personal information
          to continue with our DNA testing services.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Full Name
            </label>
            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: 7,
                fontSize: 16,
                boxSizing: "border-box",
              }}
              placeholder="Enter your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Phone Number
            </label>
            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: 7,
                fontSize: 16,
                boxSizing: "border-box",
              }}
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Address
            </label>
            <textarea
              style={{ 
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: 7,
                fontSize: 16,
                boxSizing: "border-box",
                minHeight: 80, 
                resize: 'vertical' 
              }}
              placeholder="Enter your address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              color: "#fff",
              padding: "12px",
              borderRadius: 7,
              border: "none",
              marginBottom: 7,
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Information"}
          </button>
        </form>
      </div>
    </div>
  );
}
