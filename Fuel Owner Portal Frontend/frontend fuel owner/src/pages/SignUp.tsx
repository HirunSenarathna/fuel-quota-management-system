import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgimg.jpg"; // Make sure this path is correct

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "16px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#f0f4f8",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "40px 24px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#1f2937",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const questionStyle: React.CSSProperties = {
            fontSize: "20px",
            textAlign: "left",
            fontWeight: 500,
            color: "#000000", // A nice blue for visual interest
            marginBottom: "1px",
            letterSpacing: "0.5px",
            fontStyle: "italic",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Let's Get You Registered</h1>
        <p style={questionStyle}>Are you a vehicle owner?</p>
        <button
          style={buttonStyle}
          onClick={() => navigate("/vehicle-registration")}
        >
          Register as a Vehicle Owner
        </button>
        <p style={questionStyle}>Are you a fuel station owner?</p>
        <button
          style={buttonStyle}
          onClick={() => navigate("/station-owner-registration")}
        >
          Register as a Station Owner
        </button>
      </div>
    </div>
  );
};

export default SignUp;
