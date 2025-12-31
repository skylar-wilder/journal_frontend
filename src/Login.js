import { useState } from "react";
import API from "./api";

function Login({ onLogin, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("token/", { username, password });
      localStorage.setItem("token", res.data.access);
      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={container}>
      <h1>Welcome back 🌙</h1>
      <p style={sub}>Log in to continue</p>

      {error && <p style={errorStyle}>{error}</p>}

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

      <button style={button} onClick={handleLogin}>
        Login
      </button>

      <p style={link} onClick={goToSignup}>
        New here? Create an account →
      </p>
    </div>
  );
}

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

const sub = { color: "#B0B6C1", marginBottom: 20 };
const errorStyle = { color: "#FF8A8A", marginBottom: 10 };
const input = {
  width: "260px",
  backgroundColor: "#161A22",
  color: "#FFF",
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
  marginTop: 20,
  color: "#4DA3FF",
  cursor: "pointer",
};

export default Login;
