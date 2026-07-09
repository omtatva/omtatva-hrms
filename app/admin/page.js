"use client";

import { useEffect, useState } from "react";
import {
collection,
getDocs,
doc,
getDoc,
} from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

export default function AdminPage() {
const [totalEmployees, setTotalEmployees] = useState(0);
const [attendanceCount, setAttendanceCount] = useState(0);
const [timesheetCount, setTimesheetCount] = useState(0);
const [inactiveUsers, setInactiveUsers] = useState(0);

useEffect(() => {
checkAdmin();
}, []);

const checkAdmin = async () => {
const user = auth.currentUser;

if (!user) {
  window.location.href = "/login";
  return;
}

const userDoc = await getDoc(
  doc(db, "users", user.uid)
);

if (!userDoc.exists()) {
  alert("User not found");
  window.location.href = "/";
  return;
}

const ADMIN_EMAILS = [
"admin@omtatvadigitals.com",
];

const userData = userDoc.data();

const isAdminEmail =
  ADMIN_EMAILS.includes(user.email);

const isAdminRole =
  userData.role === "admin"||
  userData.role === "head" ||
  userData.role === "HR";
 

if (!isAdminEmail && !isAdminRole) {
  alert("Unauthorized");
  window.location.href = "/";
  return;
}

loadDashboard();

};

const loadDashboard = async () => {
try {
const usersSnapshot = await getDocs(
collection(db, "users")
);

  const users = usersSnapshot.docs.map(
    (doc) => doc.data()
  );

  setTotalEmployees(users.length);

  setInactiveUsers(
    users.filter(
      (user) =>
        user.status === "inactive"
    ).length
  );

  const attendanceSnapshot =
    await getDocs(
      collection(db, "attendance")
    );

  setAttendanceCount(
    attendanceSnapshot.size
  );

  const timesheetSnapshot =
    await getDocs(
      collection(db, "timesheets")
    );

  setTimesheetCount(
    timesheetSnapshot.size
  );
} catch (error) {
  console.error(error);
}

};

const cardStyle = {
background: "#fff",
padding: "25px",
borderRadius: "15px",
boxShadow:
"0 5px 20px rgba(0,0,0,0.08)",
textAlign: "center",
};

return (
<div
style={{
maxWidth: "1300px",
margin: "30px auto",
padding: "20px",
}}
>
<h1
style={{
fontSize: "36px",
marginBottom: "10px",
}}
>
Admin Dashboard
</h1>

  <p
    style={{
      color: "#64748b",
      marginBottom: "30px",
    }}
  >
    OMTATVA DIGITALS HRMS &
    Production Management
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
    }}
  >
    <div style={cardStyle}>
      <h2>{totalEmployees}</h2>
      <p>Total Employees</p>
    </div>

    <div style={cardStyle}>
      <h2>{attendanceCount}</h2>
      <p>Attendance Records</p>
    </div>

    <div style={cardStyle}>
      <h2>{timesheetCount}</h2>
      <p>Timesheets Submitted</p>
    </div>

    <div style={cardStyle}>
      <h2>{inactiveUsers}</h2>
      <p>Inactive Employees</p>
    </div>
  </div>

  <div
    style={{
      marginTop: "40px",
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow:
        "0 5px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h2>Quick Actions</h2>

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() =>
          (window.location.href =
            "/admin/users")
        }
        style={buttonStyle}
      >
        Employee Management
      </button>

      <button
        onClick={() =>
          (window.location.href =
            "admin/attendance")
        }
        style={buttonStyle}
      >
        Attendance
      </button>
        <button
        onClick={() =>
          (window.location.href =
            "admin/leave")
        }
        style={buttonStyle}
      >
        Leave
      </button>

       <button
        onClick={() =>
          (window.location.href =
            "admin/payroll")
        }
        style={buttonStyle}
      >
        Payroll
      </button>
      <button
        onClick={() =>
          (window.location.href =
            "/timesheet")
        }
        style={buttonStyle}
      >
        Timesheet
      </button>
    </div>
  </div>
</div>

);
}

const buttonStyle = {
background: "#2563eb",
color: "#fff",
border: "none",
padding: "12px 20px",
borderRadius: "8px",
cursor: "pointer",
fontWeight: "600",
};