import { useState } from "react";
import axios from "axios";

function Signup({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
  try {
    await axios.post(
      "https://journal-backend-e78v.onrender.com/api/signup/",
      { username, password }
    );
    setMessage("Account created! You can log in now.");
  } catch (err) {
    if (err.response && err.response.data) {
      const data = err.response.data;

      if (data.username) {
        setMessage(data.username[0]);
      } else if (data.password) {
        setMessage(data.password[0]);
      } else {
        setMessage("Signup failed");
      }
    } else {
      setMessage("Signup failed");
    }
  }
};


  return (
    <div style={container}>
      <h1>Join the space ✨</h1>
      <p style={sub}>Create your account</p>

      {message && <p style={sub}>{message}</p>}

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <button style={button} onClick={handleSignup}>
        Sign up
      </button>

      <p style={link} onClick={goToLogin}>
        Already have an account? Login →
      </p>
    </div>
  );
}

/* ---------- styles ---------- */

const container = {
  minHeight: "100vh",
  backgroundColor: "#0F1115",
  color: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
};

const sub = {
  color: "#B0B6C1",
  marginBottom: "20px",
};

const input = {
  width: "260px",
  backgroundColor: "#161A22",
  color: "#FFFFFF",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "12px",
};

const button = {
  backgroundColor: "#4DA3FF",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px",
};

const link = {
  marginTop: "20px",
  color: "#4DA3FF",
  cursor: "pointer",
};

export default Signup;
