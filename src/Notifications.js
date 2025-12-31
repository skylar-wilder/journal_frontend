import { useEffect, useState } from "react";
import API from "./api";

function Notifications({ onBack }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await API.get("notifications/");
    setNotifications(res.data);
  };

  return (
    <div style={container}>
      <button onClick={onBack}>← Home</button>
      <h2>Notifications 🔔</h2>

      {notifications.length === 0 && (
        <p style={{ color: "#B0B6C1" }}>No notifications</p>
      )}

      {notifications.map((n) => (
        <div key={n.id} style={card}>
          <p>{n.message}</p>
          <small style={{ color: "#888" }}>{n.created_at}</small>
        </div>
      ))}
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
  padding: "14px",
  borderRadius: "10px",
  marginTop: "12px",
};

export default Notifications;
