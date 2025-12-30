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
    console.log("FETCHING MORNING TASKS");
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

    const res = await API.post("morning/", {
      title: newTask,
    });

    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={onBack}>← Home</button>

      <h2>Morning List 🌅</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} style={{ marginLeft: 10 }}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.is_overdue && "⏳ "}
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MorningList;
