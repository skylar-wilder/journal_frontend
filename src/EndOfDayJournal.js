import { useEffect, useState } from "react";
import API from "./api";

function EndOfDayJournal({ onBack }) {
  const [journalDate, setJournalDate] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [bestThing, setBestThing] = useState("");
  const [worstThing, setWorstThing] = useState("");
  const [lesson, setLesson] = useState("");
  const [entry, setEntry] = useState("");
  const [message, setMessage] = useState("");

  const submitJournal = async () => {
    if (!journalDate) {
      setMessage("Please select a date.");
      return;
    }

    try {
      await API.post("end-of-day/", {
        journal_date: journalDate,
        gratitude,
        best_thing: bestThing,
        worst_thing: worstThing,
        lesson,
        entry,
      });

      setMessage("Journal saved 🌙");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save journal");
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
      <button onClick={onBack}>← Home</button>

      <h2 style={{ marginTop: 20 }}>End-of-Day Journal 🌙</h2>

      {message && (
        <p style={{ marginTop: 10, color: "#B0B6C1" }}>{message}</p>
      )}

      {/* Date */}
      <div style={{ marginTop: 20 }}>
        <label>Date</label>
        <br />
        <input
          type="date"
          value={journalDate}
          onChange={(e) => setJournalDate(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Gratitude */}
      <div style={{ marginTop: 20 }}>
        <label>One thing you’re grateful for</label>
        <input
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Best */}
      <div style={{ marginTop: 20 }}>
        <label>Best thing that happened</label>
        <input
          value={bestThing}
          onChange={(e) => setBestThing(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Worst */}
      <div style={{ marginTop: 20 }}>
        <label>Worst thing that happened</label>
        <input
          value={worstThing}
          onChange={(e) => setWorstThing(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Lesson */}
      <div style={{ marginTop: 20 }}>
        <label>Lesson learned</label>
        <input
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Big Entry */}
      <div style={{ marginTop: 20 }}>
        <label>Write about your day</label>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={6}
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />
      </div>

      <button
        onClick={submitJournal}
        style={{
          marginTop: 30,
          backgroundColor: "#4DA3FF",
          border: "none",
          padding: "12px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Save Journal
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "6px",
  backgroundColor: "#161A22",
  color: "#FFFFFF",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
};

export default EndOfDayJournal;
