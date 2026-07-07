"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export default function EmployeePage() {

const { id } = useParams();

const [user,setUser] = useState(null);
const [editMode, setEditMode] = useState(false);

useEffect(() => {
loadUser();
}, []);

const loadUser = async () => {

  const docRef = doc(db, "users", id);

  const snap = await getDoc(docRef);

  if (snap.exists()) {
    setUser(snap.data());
  }

};

const saveUser = async () => {

  await updateDoc(doc(db, "users", id), user);

  alert("Employee Updated Successfully");

  setEditMode(false);

};


if(!user){

return <h2 style={{padding:40}}>Loading...</h2>

}

return(

<div
style={{
maxWidth:1000,
margin:"40px auto",
padding:30,
background:"#fff",
borderRadius:15,
boxShadow:"0 10px 30px rgba(0,0,0,.08)"
}}
>

<div
  style={{
    display: "flex",
    gap: "25px",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <img
    src={user.photoURL || "/profile.png"}
    alt="Profile"
    style={{
      width: 140,
      height: 140,
      borderRadius: "50%",
      objectFit: "cover",
      border: "5px solid #2563eb",
    }}
  />

  <div style={{ flex: 1 }}>
    <h1 style={{ marginBottom: 5 }}>
      {user.firstName} {user.lastName}
    </h1>

    <h3
      style={{
        marginTop: 0,
        color: "#64748b",
      }}
    >
      {user.designation || "Employee"}
    </h3>

    <p>
      <b>Department:</b> {user.department || "-"}
    </p>

    <p>
      <b>Employee ID:</b> {user.employeeId || "-"}
    </p>

    <p>
      <b>Email:</b> {user.email}
    </p>

    <span
      style={{
        display: "inline-block",
        marginTop: 10,
        padding: "8px 18px",
        borderRadius: 20,
        background:
          user.status === "active"
            ? "#dcfce7"
            : "#fee2e2",
        color:
          user.status === "active"
            ? "#15803d"
            : "#dc2626",
        fontWeight: 700,
      }}
    >
      {user.status || "Active"}
    </span>
  </div>
</div>

<div
  style={{
    marginTop: 20,
    marginBottom: 30,
    display: "flex",
    gap: 15,
  }}
>
  <button
    onClick={() => setEditMode(!editMode)}
    style={{
      padding: "10px 20px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
    }}
  >
    {editMode ? "Cancel" : "Edit Employee"}
  </button>

  {editMode && (
    <button
      onClick={saveUser}
      style={{
        padding: "10px 20px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      Save Changes
    </button>
  )}
</div>

<hr/>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "40px",
  }}
>

<div style={cardStyle}>
<h3>Attendance</h3>
<h1>{user.attendanceCount || 0}</h1>
<p>This Month</p>
</div>

<div style={cardStyle}>
<h3>Timesheets</h3>
<h1>{user.timesheetCount || 0}</h1>
<p>Submitted</p>
</div>

<div style={cardStyle}>
<h3>Total Hours</h3>
<h1>{user.totalHours || 0}</h1>
<p>Working Hours</p>
</div>

<div style={cardStyle}>
<h3>Performance</h3>
<h1>{user.performance || "A+"}</h1>
<p>Current Rating</p>
</div>

</div>
<h2 style={{ marginBottom: "20px" }}>
⚡ HR Quick Actions
</h2>

<div
style={{
display:"flex",
gap:"15px",
flexWrap:"wrap",
marginBottom:"40px"
}}
>

<button
style={blueBtn}
onClick={() =>
window.location.href = `/admin/attendance?employee=${id}`
}
>
Attendance
</button>

<button
style={greenBtn}
onClick={() =>
window.location.href = `/admin/leave?employee=${id}`
}
>
Leave History
</button>

<button
style={orangeBtn}
onClick={() =>
window.location.href = `/admin/payroll?employee=${id}`
}
>
Payroll
</button>

<button
style={purpleBtn}
onClick={() =>
window.location.href = `/admin/timesheets?employee=${id}`
}
>
Timesheets
</button>

<button
style={redBtn}
onClick={async () => {

const confirmDeactivate = window.confirm(
"Deactivate this employee?"
);

if (!confirmDeactivate) return;

await updateDoc(
doc(db, "users", id),
{
status: "inactive",
}
);

alert("Employee Deactivated");

loadUser();

}}
>
Deactivate
</button>

</div>

<h2>Basic Information</h2>
<div style={{ marginBottom: 20 }}>
  <label>First Name</label>

  <input
    disabled={!editMode}
    value={user.firstName || ""}
    onChange={(e) =>
      setUser({
        ...user,
        firstName: e.target.value,
      })
    }
    style={inputStyle}
  />
</div>
<div style={{ marginBottom: 20 }}>
  <label>Last Name</label>

  <input
    disabled={!editMode}
    value={user.lastName || ""}
    onChange={(e) =>
      setUser({
        ...user,
        lastName: e.target.value,
      })
    }
    style={inputStyle}
  />
</div>
<div style={{ marginBottom: 20 }}>
  <label>Employee ID</label>

  <input
    disabled={!editMode}
    value={user.employeeId || ""}
    onChange={(e) =>
      setUser({
        ...user,
        employeeId: e.target.value,
      })
    }
    style={inputStyle}
  />
</div>

<p><b>Email:</b> {user.email}</p>

<div style={{ marginBottom: 20 }}>
  <label>Phone</label>

  <input
    disabled={!editMode}
    value={user.phone || ""}
    onChange={(e) =>
      setUser({
        ...user,
        phone: e.target.value,
      })
    }
    style={inputStyle}
  />
</div>

<p><b>DOB:</b> {user.dob}</p>

<p><b>Gender:</b> {user.gender}</p>

<p><b>Blood Group:</b> {user.bloodGroup}</p>

<hr/>

<h2>💼 Job Information</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

<div>
<label>Department</label>

<select
disabled={!editMode}
value={user.department || ""}
onChange={(e)=>
setUser({
...user,
department:e.target.value
})
}
style={inputStyle}
>

<option>Production</option>
<option>Editing</option>
<option>VFX</option>
<option>Animation</option>
<option>Marketing</option>
<option>HR</option>
<option>Accounts</option>
<option>IT</option>

</select>

</div>

<div>

<label>Designation</label>

<input
disabled={!editMode}
value={user.designation || ""}
onChange={(e)=>
setUser({
...user,
designation:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Joining Date</label>

<input
type="date"
disabled={!editMode}
value={user.joiningDate || ""}
onChange={(e)=>
setUser({
...user,
joiningDate:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Role</label>

<select
disabled={!editMode}
value={user.role || ""}
onChange={(e)=>
setUser({
...user,
role:e.target.value
})
}
style={inputStyle}
>

<option>employee</option>

<option>head</option>

<option>admin</option>

</select>

</div>

<div>

<label>Status</label>

<select
disabled={!editMode}
value={user.status || ""}
onChange={(e)=>
setUser({
...user,
status:e.target.value
})
}
style={inputStyle}
>

<option>active</option>

<option>inactive</option>

</select>

</div>

</div>

<hr/>

<h2 style={{ marginTop: "40px" }}>
  💻 Company Access
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

<div>
<label>Slack ID</label>

<input
disabled={!editMode}
value={user.slackId || ""}
onChange={(e)=>
setUser({
...user,
slackId:e.target.value
})
}
style={inputStyle}
/>
</div>

<div>
<label>Google Workspace Email</label>

<input
disabled={!editMode}
value={user.email || ""}
style={inputStyle}
/>
</div>

<div>
<label>Frame.io Email</label>

<input
disabled={!editMode}
value={user.frameioEmail || ""}
onChange={(e)=>
setUser({
...user,
frameioEmail:e.target.value
})
}
style={inputStyle}
/>
</div>

<div>
<label>Manager</label>

<input
disabled={!editMode}
value={user.manager || ""}
onChange={(e)=>
setUser({
...user,
manager:e.target.value
})
}
style={inputStyle}
/>
</div>

<div>
<label>Employment Type</label>

<select
disabled={!editMode}
value={user.employmentType || ""}
onChange={(e)=>
setUser({
...user,
employmentType:e.target.value
})
}
style={inputStyle}
>

<option value="">Select</option>
<option>Full Time</option>
<option>Intern</option>
<option>Contract</option>
<option>Freelancer</option>

</select>

</div>

<div>
<label>Work Location</label>

<select
disabled={!editMode}
value={user.workLocation || ""}
onChange={(e)=>
setUser({
...user,
workLocation:e.target.value
})
}
style={inputStyle}
>

<option value="">Select</option>
<option>Office</option>
<option>Remote</option>
<option>Hybrid</option>

</select>

</div>

</div>

<h2 style={{ marginTop: "40px" }}>
  🚨 Emergency Contact
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

  <div>
    <label>Emergency Contact</label>

    <input
      disabled={!editMode}
      value={user.emergencyContact || ""}
      onChange={(e) =>
        setUser({
          ...user,
          emergencyContact: e.target.value,
        })
      }
      style={inputStyle}
    />
  </div>

  <div>
    <label>Emergency Phone</label>

    <input
      disabled={!editMode}
      value={user.emergencyPhone || ""}
      onChange={(e) =>
        setUser({
          ...user,
          emergencyPhone: e.target.value,
        })
      }
      style={inputStyle}
    />
  </div>

</div>

<hr style={{ margin: "40px 0" }} />

<h2>🏠 Address</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

  <div style={{ gridColumn: "1 / span 2" }}>
    <label>Street Address</label>

    <input
      disabled={!editMode}
      value={user.address || ""}
      onChange={(e) =>
        setUser({
          ...user,
          address: e.target.value,
        })
      }
      style={inputStyle}
    />
  </div>

    <div>
    <label>City</label>

    <input
      disabled={!editMode}
      value={user.city || ""}
      onChange={(e) =>
        setUser({
          ...user,
          city: e.target.value,
        })
      }
      style={inputStyle}
    />
  </div>

  <div>
    <label>State</label>

    <input
      disabled={!editMode}
      value={user.state || ""}
      onChange={(e) =>
        setUser({
          ...user,
          state: e.target.value,
        })
      }
      style={inputStyle}
    />
  </div>
<div>
  <label>Country</label>

  <input
    disabled={!editMode}
    value={user.country || ""}
    onChange={(e) =>
      setUser({
        ...user,
        country: e.target.value,
      })
    }
    style={inputStyle}
  />
</div>

</div>   {/* <-- CLOSE THE ADDRESS GRID */}

<hr style={{ margin: "40px 0" }} />

<h2 style={{ marginTop: "40px" }}>
  📁 Documents & Assets
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

<div>
<label>Resume URL</label>

<input
disabled={!editMode}
value={user.resume || ""}
onChange={(e)=>
setUser({
...user,
resume:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Offer Letter URL</label>

<input
disabled={!editMode}
value={user.offerLetter || ""}
onChange={(e)=>
setUser({
...user,
offerLetter:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>ID Proof URL</label>

<input
disabled={!editMode}
value={user.idProof || ""}
onChange={(e)=>
setUser({
...user,
idProof:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Bank Account</label>

<input
disabled={!editMode}
value={user.bankAccount || ""}
onChange={(e)=>
setUser({
...user,
bankAccount:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Laptop Assigned</label>

<input
disabled={!editMode}
value={user.laptop || ""}
onChange={(e)=>
setUser({
...user,
laptop:e.target.value
})
}
style={inputStyle}
/>

</div>

<div>

<label>Laptop Serial No.</label>

<input
disabled={!editMode}
value={user.laptopSerial || ""}
onChange={(e)=>
setUser({
...user,
laptopSerial:e.target.value
})
}
style={inputStyle}
/>

</div>

</div>
<hr style={{ margin: "50px 0" }} />

<h2>📊 Employee Activity</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>

<div style={cardStyle}>
<h3>Attendance</h3>
<h1>{user.attendanceCount || 0}</h1>
</div>

<div style={cardStyle}>
<h3>Timesheets</h3>
<h1>{user.timesheetCount || 0}</h1>
</div>

<div style={cardStyle}>
<h3>Total Hours</h3>
<h1>{user.totalHours || 0}</h1>
</div>

<div style={cardStyle}>
<h3>Performance</h3>
<h1>{user.performance || "N/A"}</h1>
</div>

</div>

<hr style={{ margin: "50px 0" }} />

<h2>📝 HR Notes</h2>

<textarea
disabled={!editMode}
value={user.hrNotes || ""}
onChange={(e)=>
setUser({
...user,
hrNotes:e.target.value
})
}
style={{
width:"100%",
height:"180px",
padding:"15px",
marginTop:"20px",
borderRadius:"10px",
border:"1px solid #d1d5db",
fontSize:"15px"
}}
placeholder="Private HR Notes..."
/>

<h2 style={{ marginTop: "40px" }}>
📅 Employee Timeline
</h2>

<div
style={{
background:"#f8fafc",
padding:"25px",
borderRadius:"15px",
marginTop:"20px"
}}
>

<p>✅ Joined Company : {user.joiningDate || "-"}</p>

<p>👤 Profile Completed</p>

<p>💼 Department Assigned</p>

<p>🖥 Laptop Assigned</p>

<p>📄 Offer Letter Uploaded</p>

<p>
  🎉 Last Updated :{" "}
  {user.updatedAt?.toDate?.().toLocaleDateString() || "-"}
</p>

</div>

</div>

);
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "15px",
};

const cardStyle = {
  background: "#f8fafc",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,.06)",
};

const purpleBtn = {
  background: "#7c3aed",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};