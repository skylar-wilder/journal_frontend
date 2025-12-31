function Home({ onSelect, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F1115",
        color: "#FFFFFF",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "10px" }}>Greetings 🌙</h1>
          <p style={{ color: "#B0B6C1", fontSize: "16px" }}>
            What would you like to focus on today?
          </p>
        </div>

        <button onClick={onLogout}>Logout</button>
      </div>

      {/* Feature Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <FeatureCard
          title="Morning List"
          description="Plan tasks, deadlines, and reminders"
          onClick={() => onSelect("morning")}
        />

        <FeatureCard
          title="End-of-Day Journal"
          description="Reflect, express gratitude, and unwind"
          onClick={() => onSelect("end-of-day")}
        />

        <FeatureCard
          title="Special Entries"
          description="Trips, memories, and meaningful days"
          onClick={() => onSelect("special")}
        />

        <FeatureCard
          title="Calendar & Planner"
          description="Deadlines, birthdays, and events"
          onClick={() => onSelect("calendar")}
        />

        <FeatureCard
          title="Study Timer"
          description="Focus sessions with trophies"
          onClick={() => onSelect("timer")}
        />
	

      </div>
    </div>
  );
}

function FeatureCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "#161A22",
        padding: "24px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1C2230";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#161A22";
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#B0B6C1", fontSize: "14px" }}>{description}</p>
    </div>
  );
}

export default Home;
