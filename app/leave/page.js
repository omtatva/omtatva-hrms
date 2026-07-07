"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
export default function LeavePage() {

const [leaveType, setLeaveType] = useState("");
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [reason, setReason] = useState("");
const [myLeaves, setMyLeaves] = useState([]);

useEffect(() => {
  loadMyLeaves();
}, []);

const submitLeave = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Please Login");
    return;
  }

  try {

    await addDoc(collection(db, "leaveRequests"), {

      uid: user.uid,

      employeeName: user.displayName,

      email: user.email,

      leaveType,

      fromDate,

      toDate,

      reason,

      status: "Pending",

      appliedOn: Timestamp.now(),

    });

    alert("Leave Request Submitted");

    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");

    loadMyLeaves();

  } catch (error) {

    console.error(error);

    alert("Failed to submit");

  }

};
const loadMyLeaves = async () => {
  const user = auth.currentUser;

  if (!user) return;

  const q = query(
    collection(db, "leaveRequests"),
    where("uid", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setMyLeaves(list);
};

const casualLeave = 12;
const sickLeave = 10;
const paidLeave = 18;

const approvedCasual = myLeaves.filter(
  (l) => l.leaveType === "Casual Leave" && l.status === "Approved"
).length;

const approvedSick = myLeaves.filter(
  (l) => l.leaveType === "Sick Leave" && l.status === "Approved"
).length;

const approvedPaid = myLeaves.filter(
  (l) => l.leaveType === "Paid Leave" && l.status === "Approved"
).length;

const pendingLeave = myLeaves.filter(
  (l) => l.status === "Pending"
).length;


return (

<div
style={{
maxWidth:900,
margin:"40px auto",
padding:30,
background:"#fff",
borderRadius:20,
boxShadow:"0 10px 30px rgba(0,0,0,.08)"
}}
>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>

  <div style={card}>
  <h3>Casual Leave</h3>
  <h1>{casualLeave - approvedCasual}</h1>
  <small>Remaining</small>
</div>

<div style={card}>
  <h3>Sick Leave</h3>
  <h1>{sickLeave - approvedSick}</h1>
  <small>Remaining</small>
</div>

<div style={card}>
  <h3>Paid Leave</h3>
  <h1>{paidLeave - approvedPaid}</h1>
  <small>Remaining</small>
</div>

</div>

<h1>🏖 Leave Management</h1>

<p style={{color:"#64748b"}}>
Apply for leave and track your requests.
</p>

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:20,
marginTop:30
}}
>

<div>

<label>Leave Type</label>

<select
value={leaveType}
onChange={(e)=>setLeaveType(e.target.value)}
style={inputStyle}
>

<option value="">Select</option>

<option>Casual Leave</option>

<option>Sick Leave</option>

<option>Paid Leave</option>

<option>Work From Home</option>

<option>Emergency Leave</option>

</select>

</div>

<div>

<label>From Date</label>

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
style={inputStyle}
/>

</div>

<div>

<label>To Date</label>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
style={inputStyle}
/>

</div>

<div>

<label>Reason</label>

<textarea
rows={4}
value={reason}
onChange={(e)=>setReason(e.target.value)}
style={inputStyle}
/>

</div>

</div>

<button
  onClick={submitLeave}
  style={{
    marginTop:30,
    padding:"15px 30px",
    background:"#2563eb",
    color:"#fff",
    border:"none",
    borderRadius:10,
    cursor:"pointer",
    fontWeight:"bold"
  }}
>

Submit Leave Request

</button>

<hr style={{ margin: "40px 0" }} />

<h2>📋 My Leave Requests</h2>

<table
  style={{
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  }}
>
  <thead>
    <tr>
      <th style={th}>Leave</th>
      <th style={th}>From</th>
      <th style={th}>To</th>
      <th style={th}>Status</th>
    </tr>
  </thead>

  <tbody>
    {myLeaves.map((leave) => (
      <tr key={leave.id}>
        <td style={td}>{leave.leaveType}</td>
        <td style={td}>{leave.fromDate}</td>
        <td style={td}>{leave.toDate}</td>
        <td style={td}>{leave.status}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>

);

}

const inputStyle={
width:"100%",
padding:"12px",
marginTop:"8px",
border:"1px solid #d1d5db",
borderRadius:"10px"
};

const th = {
  padding: "12px",
  background: "#f8fafc",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};
const card = {
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,.08)",
};
