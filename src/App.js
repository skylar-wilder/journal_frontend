import { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [journals, setJournals] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchJournals();
    }
  }, []);

  const login = async () => {
    try {
      setError("");
      const res = await API.post("token/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access);
      setLoggedIn(true);
      fetchJournals();
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setJournals([]);
  };

  const fetchJournals = async () => {
    const res = await API.get("journals/");
    setJournals(res.data);
  };

  const createJournal = async () => {
    if (!content.trim()) return;
    const res = await API.post("journals/", {
      content,
      is_shared: false,
    });
    setJournals([res.data, ...journals]);
    setContent("");
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={logout}>Logout</button>

      <h2>My Journals</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={createJournal}>Save</button>

      <hr />

      {journals.map((j) => (
        <div key={j.id}>
          <p>{j.content}</p>
          <small>{j.created_at}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
