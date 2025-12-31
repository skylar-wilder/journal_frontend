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
    } catch {
      setMessage("Signup failed");
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

export default Signup;
