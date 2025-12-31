import { useEffect, useState } from "react";
import API from "./api";

function FriendCenter({ onBack }) {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFriends();
    fetchRequests();
  }, []);

  const fetchFriends = async () => {
    const res = await API.get("friends/");
    setFriends(res.data);
  };

  const fetchRequests = async () => {
    const res = await API.get("friends/requests/");
    setRequests(res.data);
  };

  const sendRequest = async () => {
    try {
      await API.post("friends/request/", { username });
      setMessage("Friend request sent");
      setUsername("");
    } catch (err) {
      setMessage("Failed to send request");
    }
  };

  const acceptRequest = async (id) => {
    await API.post(`friends/accept/${id}/`);
    fetchFriends();
    fetchRequests();
  };

  return (
    <div style={container}>
      <button onClick={onBack}>← Home</button>
      <h2>Friend Center 👥</h2>

      {message && <p style={sub}>{message}</p>}

      <div style={card}>
        <h3>Add Friend</h3>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />
        <button onClick={sendRequest}>Send Request</button>
      </div>

      <div style={card}>
        <h3>Your Friends</h3>
        {friends.length === 0 && <p style={sub}>No friends yet</p>}
        {friends.map((f) => (
          <p key={f.id}>@{f.username}</p>
        ))}
      </div>

      <div style={card}>
        <h3>Requests</h3>
        {requests.length === 0 && <p style={sub}>No pending requests</p>}
        {requests.map((r) => (
          <div key={r.id}>
            <span>@{r.from_user}</span>
            <button onClick={() => acceptRequest(r.id)}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  backgroundColor: "#0F1115",
  color: "#FFFFFF",
  padding: "40px",
};

const card = {
  backgroundColor: "#161A22",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "20px",
};

const input = {
  backgroundColor: "#0F1115",
  color: "#FFF",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  marginRight: "8px",
};

const sub = { color: "#B0B6C1" };

export default FriendCenter;
