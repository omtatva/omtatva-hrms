"use client";

import { useEffect, useState } from "react";
import { collection, getDocs ,getDoc,doc} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
const [myTimesheets, setMyTimesheets] = useState([]);
const [myAttendance, setMyAttendance] = useState([]);
const [userName, setUserName] = useState("");
const [userData, setUserData] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    // Load user profile
    const userRef = doc(db, "users", user.uid);

const snap = await getDoc(userRef);

if (snap.exists()) {

    const data = snap.data();

    setUserData(data);

    setUserName(
        `${data.firstName || ""} ${data.lastName || ""}`.trim()
    );

}

    // Load dashboard data
    await loadMyData(user);
  });

  return () => unsubscribe();
}, []);

const loadMyData = async (user) => {
  try {
  const attendanceSnapshot = await getDocs(
    collection(db, "attendance")
  );

  const attendanceData = attendanceSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((item) => item.userId === user.uid);

  setMyAttendance(attendanceData);

  const timesheetSnapshot = await getDocs(
    collection(db, "timesheets")
  );

  const timesheetData = timesheetSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((item) => item.email === user.email);

  setMyTimesheets(timesheetData);
} catch (error) {
  console.error(error);
}

};

const totalHours = myTimesheets.reduce(
(sum, item) => sum + Number(item.hours || 0),
0
);

const avgHours =
myAttendance.length > 0
? (totalHours / myAttendance.length).toFixed(1)
: 0;

const cardStyle = {
background: "#fff",
padding: "25px",
borderRadius: "15px",
boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
textAlign: "center",
};

return (
<div
style={{
maxWidth: "1400px",
margin: "30px auto",
padding: "20px",
background: "#f8fafc",
minHeight: "100vh",
}}
>
{/* Header */}
<div
style={{
background:
"linear-gradient(135deg,#2563eb,#1e40af)",
color: "#fff",
padding: "30px",
borderRadius: "20px",
marginBottom: "30px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
}}
>
<div>
<h1 style={{ margin: 0 }}>
Welcome Back, {userName || "Employee"} 👋
</h1>

      <p
        style={{
          marginTop: "10px",
          opacity: 0.9,
        }}
      >
        Track attendance, productivity and
        timesheets.
      </p>
    </div>

    <div
      style={{
        background:
          "rgba(255,255,255,0.15)",
        padding: "15px 20px",
        borderRadius: "12px",
      }}
    >
      {new Date().toDateString()}
    </div>
  </div>

  {/* Stats Cards */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    {/* Quick Actions */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>

  <div
    style={actionCard}
    onClick={() => (window.location.href = "/attendance")}
  >
    <h3>🕒 Attendance</h3>
    <p>View attendance history</p>
  </div>

  <div
    style={actionCard}
    onClick={() => (window.location.href = "/timesheet")}
  >
    <h3>📋 Timesheets</h3>
    <p>Submit & view timesheets</p>
  </div>

  <div
    style={actionCard}
    onClick={() => (window.location.href = "/leave")}
  >
    <h3>🏖 Leave</h3>
    <p>Apply & track leave</p>
  </div>

  <div
    style={actionCard}
    onClick={() => (window.location.href = "/documents")}
  >
    <h3>📄 My Documents</h3>
    <p>Payslips & HR Documents</p>
  </div>

  <div style={cardStyle}>
  <h3>Performance</h3>

  <h1>
    {userData?.performance || "Pending"}
  </h1>

  <p>Current Rating</p>
</div>

</div>
    <div style={cardStyle}>
      <h3>Total Attendance</h3>
      <h1>{myAttendance.length}</h1>
    </div>

    <div style={cardStyle}>
      <h3>Total Hours Worked</h3>
      <h1>{totalHours}</h1>
    </div>

    <div style={cardStyle}>
      <h3>Timesheets Submitted</h3>
      <h1>{myTimesheets.length}</h1>
    </div>

    <div style={cardStyle}>
      <h3>Average Hours</h3>
      <h1>{avgHours}</h1>
    </div>
  </div>



{/* Communication & AI Workspace */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  {/* Slack */}
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h2>💬 Communication</h2>


    <a
      href="https://app.slack.com/client"
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        marginTop: "20px",
        textDecoration: "none",
        background: "#4A154B",
        color: "#fff",
        padding: "18px",
        borderRadius: "12px",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "16px",
      }}
    >
      Open Slack
    </a>

    <p
      style={{
        marginTop: "15px",
        color: "#64748b",
        textAlign: "center",
      }}
    >
      Team Chat • Huddles • Meetings
    </p>
  </div>

  {/* AI Workspace */}
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h2>🤖 AI Workspace</h2>
    
    <button
      onClick={() =>
        (window.location.href = "/workspace/Frameo")
      }
      style={{
        marginTop: "20px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "15px 25px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "16px",
      }}
    >
      🚀 Frameo Workspace
    </button>

      <button
      onClick={() =>
        (window.location.href = "/workspace/higgsfield")
      }
      style={{
        marginTop: "20px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "15px 25px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "16px",
      }}
    >
      🚀 Higgsfield Workspace
    </button>

    <p
      style={{
        marginTop: "15px",
        color: "#64748b",
        lineHeight: "1.6",
      }}
    >
      Access Frameo AI, project resources,
      production workflows, prompt libraries,
      assets and company tools from one place.
    </p>
  </div>
</div>

  {/* Attendance History */}
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow:
        "0 5px 20px rgba(0,0,0,0.08)",
      marginBottom: "30px",
    }}
  >
    <h2>📅 Attendance History</h2>

    <table
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Check In</th>
          <th style={thStyle}>Check Out</th>
        </tr>
      </thead>

      <tbody>
        {myAttendance.map((item) => (
          <tr key={item.id}>
            <td style={tdStyle}>{item.date}</td>

            <td style={tdStyle}>
              {item.checkIn
                ? item.checkIn
                    .toDate()
                    .toLocaleTimeString()
                : "-"}
            </td>

            <td style={tdStyle}>
              {item.checkOut
                ? item.checkOut
                    .toDate()
                    .toLocaleTimeString()
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

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

const toolStyle = {
  textDecoration: "none",
  background: "#eff6ff",
  color: "#1e3a8a",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "600",
  transition: "0.3s",
};

const actionCard = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  cursor: "pointer",
  transition: "0.3s",
};