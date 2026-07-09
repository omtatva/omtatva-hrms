"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function TimesheetPage() {
  const [client, setClient] = useState("");
  const [episode, setEpisode] = useState("");
  const [task, setTask] = useState("");
  const [tool, setTool] = useState("");
  const [hours, setHours] = useState("");
  const [status, setStatus] = useState("Completed");
  const [notes, setNotes] = useState("");
  const [myTimesheets, setMyTimesheets] = useState([]);
  const saveTimesheet = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!client || !task || !hours) {
      alert("Please fill required fields");
      return;
    }

    try {
      await addDoc(collection(db, "timesheets"), {
        userId: user.uid,
        employeeName: user.displayName,
        email: user.email,

        client,
        episodeName: episode,
        task,
        aiTool: tool,
        hours: Number(hours),
        status,
        notes,

        workDate: new Date().toISOString().split("T")[0],
        createdAt: new Date(),
      });

      alert("Timesheet Saved Successfully");

      setClient("");
      setEpisode("");
      setTask("");
      setTool("");
      setHours("");
      setStatus("Completed");
      setNotes("");

    } catch (error) {
      console.error(error);
      alert("Failed to save timesheet");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Daily Timesheet</h1>

      <label>Client *</label>
      <br />
      <select
        value={client}
        onChange={(e) => setClient(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Client</option>
        <option>Dashverse</option>
        <option>Internal Project</option>
        <option>Client A</option>
        <option>Client B</option>
      </select>

      <br /><br />

      <label>Episode</label>
      <br />
      <input
        style={styles.input}
        placeholder="Episode Number"
        value={episode}
        onChange={(e) => setEpisode(e.target.value)}
      />

      <br /><br />

      <label>Task *</label>
      <br />
      <select
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Task</option>
        <option>Script Writing</option>
        <option>Prompt Engineering</option>
        <option>Image Generation</option>
        <option>Video Generation</option>
        <option>Voice Generation</option>
        <option>Video Editing</option>
        <option>Quality Check</option>
      </select>

      <br /><br />

      <label>AI Tool</label>
      <br />
      <select
        value={tool}
        onChange={(e) => setTool(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Tool</option>
        <option>ChatGPT</option>
        <option>Midjourney</option>
        <option>Runway</option>
        <option>Kling</option>
        <option>Pika</option>
        <option>ElevenLabs</option>
        <option>Frameo AI</option>
      </select>

      <br /><br />

      <label>Hours *</label>
      <br />
      <input
        type="number"
        min="0"
        step="0.5"
        style={styles.input}
        placeholder="Hours Worked"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <br /><br />

      <label>Status</label>
      <br />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={styles.input}
      >
        <option>Completed</option>
        <option>In Progress</option>
        <option>Pending Review</option>
        <option>Blocked</option>
      </select>

      <br /><br />

      <label>Notes</label>
      <br />
      <textarea
        rows="4"
        style={{
          ...styles.input,
          height: "100px",
        }}
        placeholder="Add notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button
        onClick={saveTimesheet}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Save Timesheet
      </button>


       {/* Timesheets */}
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow:
        "0 5px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h2>📋 Timesheet History</h2>

    <table
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Client</th>
          <th style={thStyle}>Episode</th>
          <th style={thStyle}>Task</th>
          <th style={thStyle}>AI Tool</th>
          <th style={thStyle}>Hours</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>

      <tbody>
        {myTimesheets.map((item) => (
          <tr key={item.id}>
            <td style={tdStyle}>{item.client}</td>
            <td style={tdStyle}>
              {item.episodeName}
            </td>
            <td style={tdStyle}>{item.task}</td>
            <td style={tdStyle}>{item.aiTool}</td>
            <td style={tdStyle}>{item.hours}</td>

            <td style={tdStyle}>
              <span
                style={{
                  background:
                    item.status ===
                    "Completed"
                      ? "#dcfce7"
                      : "#fef3c7",
                  color:
                    item.status ===
                    "Completed"
                      ? "#15803d"
                      : "#d97706",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "600",
                }}
              >
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
};

const thStyle = {
borderBottom: "1px solid #ddd",
padding: "12px",
textAlign: "left",
background: "#f8fafc",
};

const tdStyle = {
borderBottom: "1px solid #eee",
padding: "12px",
}; 