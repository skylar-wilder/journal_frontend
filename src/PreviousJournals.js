import { useEffect, useState } from "react";
import API from "./api";

function PreviousJournals({ onBack }) {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await API.get("end-of-day/");
      setJournals(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load previous journals");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F1115",
        color: "#FFFFFF",
        padding: "40px",
      }}
    >
      <button onClick={onBack}>← Back</button>

      <h2 style={{ marginTop: 20 }}>Previous Journal Entries 📖</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {journals.length === 0 && (
        <p style={{ color: "#B0B6C1" }}>No previous entries yet.</p>
      )}

      {journals.map((j) => (
        <div
          key={j.id}
          style={{
            backgroundColor: "#161A22",
            padding: "16px",
            borderRadius: "10px",
            marginTop: "16px",
          }}
        >
          <strong>{j.journal_date}</strong>

          <p style={{ color: "#B0B6C1", marginTop: "8px" }}>
            {j.entry
              ? j.entry.slice(0, 120) + (j.entry.length > 120 ? "…" : "")
              : "No detailed entry"}
          </p>

          <p style={{ fontSize: "13px", color: "#888" }}>
            Tasks completed: {j.tasks_completed} / {j.tasks_total}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PreviousJournals;
