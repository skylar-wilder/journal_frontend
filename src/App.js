import { useState, useEffect } from "react";
import API from "./api";
import Home from "./Home";
import MorningList from "./MorningList";
import EndOfDayJournal from "./EndOfDayJournal";
import PreviousJournals from "./PreviousJournals";
import Login from "./Login";
import Signup from "./Signup";



function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [journals, setJournals] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState("home");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
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
      setPage("home");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setPage("home");
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

  /* ---------------- LOGIN ---------------- */

  const [authPage, setAuthPage] = useState("login");

if (!loggedIn) {
  if (authPage === "login") {
    return (
      <Login
        onLogin={() => {
          setLoggedIn(true);
          setPage("home");
        }}
        goToSignup={() => setAuthPage("signup")}
      />
    );
  }

  return <Signup goToLogin={() => setAuthPage("login")} />;
}

  /* ---------------- HOME ---------------- */

  if (page === "home") {
    return (
      <Home
        onSelect={(selected) => {
          if (selected === "journal") {
            fetchJournals();
            setPage("journals");
          } else if (selected === "morning") {
            setPage("morning");
          } else if (selected === "end-of-day") {
            setPage("end-of-day");
          } else {
            alert("Coming soon 🌱");
          }
        }}
        onLogout={logout}
      />
    );
  }

  /* ---------------- MORNING LIST ---------------- */

  if (page === "morning") {
    return <MorningList onBack={() => setPage("home")} />;
  }

  /* ---------------- END OF DAY JOURNAL ---------------- */

  if (page === "end-of-day") {
  return (
    <EndOfDayJournal
      onBack={(dest) => {
        if (dest === "previous") setPage("previous-journals");
        else setPage("home");
      }}
    />
  );
 }
 
 /* ---------------- PREVIOUS JOURNAL ---------------- */

if (page === "previous-journals") {
  return <PreviousJournals onBack={() => setPage("end-of-day")} />;
}



  /* ---------------- JOURNALS ---------------- */

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setPage("home")}>← Home</button>
      <button onClick={logout} style={{ marginLeft: 10 }}>
        Logout
      </button>

      <h2 style={{ marginTop: 20 }}>My Journals</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "100px" }}
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
