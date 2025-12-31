function TopBar({ onFriends, onNotifications, onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#0F1115",
        borderBottom: "1px solid #1C2230",
      }}
    >
      <button onClick={onFriends} style={iconButton}>
        👥
      </button>

      <button onClick={onNotifications} style={iconButton}>
        🔔
      </button>

      <button onClick={onLogout} style={logoutButton}>
        Logout
      </button>
    </div>
  );
}

const iconButton = {
  background: "none",
  border: "none",
  color: "#FFFFFF",
  fontSize: "20px",
  cursor: "pointer",
  marginRight: "14px",
};

const logoutButton = {
  backgroundColor: "#161A22",
  border: "none",
  color: "#FFFFFF",
  padding: "6px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default TopBar;
