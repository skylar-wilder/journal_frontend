import { useState, useEffect } from "react";
import API from "./api";

import Home from "./Home";
import MorningList from "./MorningList";
import EndOfDayJournal from "./EndOfDayJournal";
import PreviousJournals from "./PreviousJournals";

import Login from "./Login";
import Signup from "./Signup";

import FriendCenter from "./FriendCenter";
import Notifications from "./Notifications";
import TopBar from "./TopBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("home");

  // overlay: null | "friends" | "notifications"
  const [overlay, setOverlay] = useState(null);

  const [authPage, setAuthPage] = useState("login");

  /* ---------------- AUTH CHECK ---------------- */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setPage("home");
    setOverlay(null);
  };

  /* ---------------- AUTH PAGES ---------------- */

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

  /* ---------------- OVERLAYS ---------------- */

  if (overlay === "friends") {
    return (
      <>
        <TopBar
          onFriends={() => setOverlay("friends")}
          onNotifications={() => setOverlay("notifications")}
          onLogout={logout}
        />
        <FriendCenter onBack={() => setOverlay(null)} />
      </>
    );
  }

  if (overlay === "notifications") {
    return (
      <>
        <TopBar
          onFriends={() => setOverlay("friends")}
          onNotifications={() => setOverlay("notifications")}
          onLogout={logout}
        />
        <Notifications onBack={() => setOverlay(null)} />
      </>
    );
  }

  /* ---------------- MAIN PAGES ---------------- */

  return (
    <>
      <TopBar
        onFriends={() => setOverlay("friends")}
        onNotifications={() => setOverlay("notifications")}
        onLogout={logout}
      />

      {page === "home" && (
        <Home
          onSelect={(selected) => {
            if (selected === "morning") setPage("morning");
            else if (selected === "end-of-day") setPage("end-of-day");
            else alert("Coming soon 🌱");
          }}
        />
      )}

      {page === "morning" && (
        <MorningList onBack={() => setPage("home")} />
      )}

      {page === "end-of-day" && (
        <EndOfDayJournal
          onBack={(dest) => {
            if (dest === "previous") setPage("previous-journals");
            else setPage("home");
          }}
        />
      )}

      {page === "previous-journals" && (
        <PreviousJournals onBack={() => setPage("end-of-day")} />
      )}
    </>
  );
}

export default App;
