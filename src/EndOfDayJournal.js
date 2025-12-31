import { useState, useEffect } from "react";
import API from "./api";

function EndOfDayJournal({ onBack }) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [friends, setFriends] = useState([]);
  const [shareEnabled, setShareEnabled] = useState(false);
  const [sharedWith, setSharedWith] = useState([]);

  useEffect(() => {
    API.get("friends/").then((res) => setFriends(res.data));
  }, []);

  const saveJournal = async () => {
    if (!content.trim()) return;

    const res = await API.post("end-of-day/", {
      content,
      entry_date: date || null,
    });

    const journalId = res.data.id;

    if (shareEnabled) {
      await API.patch(`end-of-day/${journalId}/share/`, {
        shared_with: sharedWith,
      });
    }

    setContent("");
    setDate("");
    setShareEnabled(false);
    setSharedWith([]);
    onBack("home");
  };

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
      <button onClick={() => onBack("home")}>← Home</button>

      <h2 style={{ marginTop: 20 }}>End of Day Journal 🌙</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          backgroundColor: "#161A22",
          color: "#FFFFFF",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />

      <textarea
        placeholder="Write about your day…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          height: "160px",
          backgroundColor: "#161A22",
          color: "#FFFFFF",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
        }}
      />

      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={shareEnabled}
            onChange={(e) => setShareEnabled(e.target.checked)}
          />{" "}
          Share this journal
        </label>
      </div>

      {shareEnabled && (
        <div style={{ marginTop: 10 }}>
          {friends.map((f) => (
            <div key={f.id}>
              <label>
                <input
                  type="checkbox"
                  checked={sharedWith.includes(f.id)}
                  onChange={() =>
                    setSharedWith((prev) =>
                      prev.includes(f.id)
                        ? prev.filter((x) => x !== f.id)
                        : [...prev, f.id]
                    )
                  }
                />{" "}
                @{f.username}
              </label>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={saveJournal}
        style={{
          marginTop: 20,
          backgroundColor: "#1C2230",
          color: "#FFFFFF",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}

export default EndOfDayJournal;
