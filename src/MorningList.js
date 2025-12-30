import { useEffect, useState } from "react";
import API from "./api";

function MorningList({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("morning/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await API.post("morning/", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  const toggleComplete = async (id) => {
    const res = await API.patch(`morning/${id}/toggle/`);
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
  };

  const hideTask = async (id) => {
    await API.patch(`morning/${id}/hide/`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const todayTasks = tasks.filter((t) => !t.is_overdue);
  const overdueTasks = tasks.filter((t) => t.is_overdue);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;

  const renderTask = (task) => (
    <div
      key={task.id}
      style={{
        backgroundColor: task.is_overdue ? "#2A1C1C" : "#161A22",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          textDecoration: task.is_completed ? "line-through" : "none",
          color: task.is_overdue ? "#FF8A8A" : "#FFFFFF",
        }}
      >
        {task.is_overdue && "⏳ "}
        {task.title}
      </span>

      <div>
        <button onClick={() => toggleComplete(task.id)}>
          {task.is_completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => hideTask(task.id)} style={{ marginLeft: 8 }}>
          Hide
        </button>
      </div>
    </div>
  );

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

      <h2 style={{ marginTop: 20 }}>Morning List 🌅</h2>

      <p style={{ color: "#B0B6C1" }}>
        {completed} / {total} tasks completed
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            backgroundColor: "#161A22",
            color: "#FFFFFF",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            width: "70%",
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: 10,
            backgroundColor: "#4DA3FF",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {overdueTasks.length > 0 && (
        <>
          <h3 style={{ color: "#FF8A8A" }}>Overdue</h3>
          {overdueTasks.map(renderTask)}
        </>
      )}

      <h3 style={{ marginTop: 20 }}>Today</h3>
      {todayTasks.map(renderTask)}
    </div>
  );
}

export default MorningList;
