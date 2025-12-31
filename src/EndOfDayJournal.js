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

    // 1️⃣ create journal
    const res = await API.post("end-of-day/", {
      content,
      entry_date: date || null,
    });

    const journalId = res.data.id;

    // 2️⃣ update sharing
    if (shareEnabled) {
      await API.patch(`end-of-day/${journalId}/share/`, {
        shared_with: sharedWith,
      });
    }

    setContent("");
    setSharedWith([]);
    setShareEnabled(false);
    onBack("home");
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => onBack("home")}>← Home</button>

      <h2>End of Day Journal 🌙</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <textarea
        placeholder="Write about your day…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "160px" }}
      />

      {/* SHARE TOGGLE */}
      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={shareEnabled}
            onChange={(e) => setShareEnabled(e.target.checked)}
          />
          Share this journal
        </label>
      </div>

      {/* FRIEND LIST */}
      {shareEnabled && (
        <div style={{ marginTop: 10 }}>
          {friends.map((f) => (
            <div key={f.id}>
              <label>
                <input
                  type="checkbox"
                  checked={sharedWith.includes(f.id)}
                  onChange={() => {
                    setSharedWith((prev) =>
                      prev.includes(f.id)
                        ? prev.filter((x) => x !== f.id)
                        : [...prev, f.id]
                    );
                  }}
                />
                @{f.username}
              </label>
            </div>
          ))}
        </div>
      )}

      <br />
      <button onClick={saveJournal}>Save</button>
    </div>
  );
}

export default EndOfDayJournal;
