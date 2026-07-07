"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../lib/firebase";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const today = new Date().toISOString().split("T")[0];
const [attendanceHistory, setAttendanceHistory] = useState([]);

const [presentDays, setPresentDays] = useState(0);
const [absentDays, setAbsentDays] = useState(0);
const [lateDays, setLateDays] = useState(0);
const [workingHours, setWorkingHours] = useState(0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          window.location.href = "/login";
          return;
        }

        setCurrentUser(user);
        await loadAttendance(user.uid);
      }
    );

    return () => unsubscribe();
  }, []);

  const loadAttendance = async (uid) => {
    const q = query(
      collection(db, "attendance"),
      where("userId", "==", uid),
      where("date", "==", today)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setAttendance({
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      });
    } else {
      setAttendance(null);
    }
  };

  const PunchIn = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (attendance) {
      alert("Already Punched in today");
      return;
    }

    try {
      await addDoc(collection(db, "attendance"), {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        date: today,
        PunchIn: new Date(),
        PunchOut: null,
        status: "Present",
      });

      await loadAttendance(user.uid);

      alert("Punch In Successful");
    } catch (error) {
      console.error(error);
      alert("Punch In Failed");
    }
  };

  const PunchOut = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!attendance) {
      alert("Please Punch in first");
      return;
    }

    if (attendance.PunchOut) {
      alert("Already Punched out");
      return;
    }

    try {
      const q = query(
        collection(db, "attendance"),
        where("userId", "==", user.uid),
        where("date", "==", today)
      );

      const snapshot = await getDocs(q);

      const docRef = snapshot.docs[0].ref;

      await updateDoc(docRef, {
        PunchOut: new Date(),
      });

      await loadAttendance(user.uid);

      alert("Punch Out Successful");
    } catch (error) {
      console.error(error);
      alert("Punch Out Failed");
    }
  };

  const totalHours =
    attendance?.PunchIn && attendance?.PunchOut
      ? (
          (attendance.PunchOut.toDate() -
            attendance.PunchIn.toDate()) /
          (1000 * 60 * 60)
        ).toFixed(2)
      : null;

 return (
  <div
    style={{
      maxWidth: 1400,
      margin: "40px auto",
      padding: "30px",
    }}
  >
    <h1>📅 Attendance Dashboard</h1>

    <p
      style={{
        color: "#64748b",
        marginBottom: "30px",
      }}
    >
      Track your attendance, working hours and attendance history.
    </p>

    {/* Summary Cards */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h3>Present Days</h3>
        <h1>{presentDays || 0}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Absent Days</h3>
        <h1>{absentDays || 0}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Late Days</h3>
        <h1>{lateDays || 0}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Working Hours</h3>
        <h1>{workingHours || 0}h</h1>
      </div>
    </div>

    {/* Today's Attendance */}

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >
      <h2>🟢 Today's Attendance</h2>

      <p>
        <b>Employee:</b> {currentUser?.firstName} {currentUser?.lastName}
      </p>

      <p>
        <b>Date:</b> {today}
      </p>

      <p>
        <b>Status:</b> {attendance?.status || "Not Punched In"}
      </p>

      <p>
        <b>Punch In:</b> {attendance?.PunchIn || "--"}
      </p>

      <p>
        <b>Punch Out:</b> {attendance?.PunchOut || "--"}
      </p>

      <p>
        <b>Total Hours:</b> {attendance?.hours || 0}
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={PunchIn}
          style={greenBtn}
          disabled={
            attendance?.status === "Working" ||
            attendance?.status === "Completed"
          }
        >
          Punch In
        </button>

        <button
          onClick={PunchOut}
          style={redBtn}
          disabled={attendance?.status !== "Working"}
        >
          Punch Out
        </button>
      </div>
    </div>
  </div>
);
}

const cardStyle={
background:"#fff",
padding:"25px",
borderRadius:"15px",
textAlign:"center",
boxShadow:"0 10px 20px rgba(0,0,0,.08)"
};

const th={
padding:"15px",
background:"#f8fafc",
textAlign:"left"
};

const td={
padding:"15px",
borderBottom:"1px solid #eee"
};

const greenBtn={
background:"#22c55e",
color:"#fff",
padding:"12px 22px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
};

const redBtn={
background:"#ef4444",
color:"#fff",
padding:"12px 22px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
};



