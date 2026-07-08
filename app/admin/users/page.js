"use client";

import { useEffect, useState } from "react";
import {
collection,
getDocs,
doc,
updateDoc,
deleteDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export default function UsersPage() {
const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");
const [roleFilter, setRoleFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [loading, setLoading] = useState(true);
const [editingId, setEditingId] = useState("");
const [employeeCode, setEmployeeCode] = useState("");

useEffect(() => {
loadUsers();
}, []);

const loadUsers = async () => {
try {
const snapshot = await getDocs(
collection(db, "users")
);

  const userList = snapshot.docs.map((userDoc) => ({
    id: userDoc.id,
    ...userDoc.data(),
  }));

  setUsers(userList);
} catch (error) {
  console.error("Load Users Error:", error);
} finally {
  setLoading(false);
}

};

const updateRole = async (userId, role) => {
try {
await updateDoc(
doc(db, "users", userId),
{ role }
);

  alert("Role updated successfully");
  loadUsers();
} catch (error) {
  console.error(error);
  alert("Failed to update role");
}

};

const updateStatus = async (userId, status) => {
try {
await updateDoc(
doc(db, "users", userId),
{ status }
);

  alert(`User ${status}`);
  loadUsers();
} catch (error) {
  console.error(error);
  alert("Failed to update status");
}

};
const saveEmployeeId = async (userId) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      employeeId: employeeCode,
    });

    alert("Employee ID Updated");

    setEditingId("");
    setEmployeeCode("");

    loadUsers();
  } catch (error) {
    console.error(error);
    alert("Failed to update Employee ID");
  }
};

const deleteUser = async (userId) => {
const confirmed = window.confirm(
"Are you sure you want to permanently delete this user?"
);

if (!confirmed) return;

try {
  await deleteDoc(
    doc(db, "users", userId)
  );

  alert("User deleted");
  loadUsers();
} catch (error) {
  console.error(error);
  alert("Delete failed");
}

};

if (loading) {
return (
<div style={{ padding: "30px" }}>
Loading Users...
</div>
);
}

const totalEmployees = users.length;

const activeEmployees = users.filter(
  (user) => user.status === "active"
).length;

const inactiveEmployees = users.filter(
  (user) => user.status === "inactive"
).length;

const adminCount = users.filter(
  (user) => user.role === "admin"
).length;

return (
<div
style={{
maxWidth: "1400px",
margin: "30px auto",
padding: "20px",
}}
>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  }}
>
  <div>
    <h1
      style={{
        fontSize: "34px",
        margin: 0,
      }}
    >
      👥 Employee Management
    </h1>

    <p
      style={{
        color: "#64748b",
        marginTop: "8px",
      }}
    >
      Manage employees, departments, roles and company access.
    </p>
  </div>

  <button
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    + Add Employee
  </button>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>

<div style={card}>
<h3>Total Employees</h3>
<h1>{totalEmployees}</h1>
</div>

<div style={card}>
<h3>Active Employees</h3>
<h1>{activeEmployees}</h1>
</div>

<div style={card}>
<h3>Inactive Employees</h3>
<h1>{inactiveEmployees}</h1>
</div>

<div style={card}>
<h3>Admins</h3>
<h1>{adminCount}</h1>
</div>

</div>


  <div
    style={{
      background: "#fff",
      borderRadius: "12px",
      overflowX: "auto",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.08)",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#f8fafc",
          }}
        >
          <th style={th}>Name</th>
          <th style={th}>Employee ID</th>
          <th style={th}>Email</th>
          <th style={th}>Department</th>
          <th style={th}>Designation</th>
          <th style={th}>Role</th>
          <th style={th}>Status</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
            <tr key={user.id}>
            <td style={td}>
  {user.firstName || user.lastName
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "-"}
</td>
            <td style={td}>
  {editingId === user.id ? (
    <>
      <input
        value={employeeCode}
        onChange={(e) => setEmployeeCode(e.target.value)}
        placeholder="EMP001"
        style={{
          padding: "6px",
          width: "90px",
          marginRight: "8px",
        }}
      />

      <button
        onClick={() => saveEmployeeId(user.id)}
        style={greenBtn}
      >
        Save
      </button>
    </>
  ) : (
    <>
      {user.employeeId || "-"}

      <button
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={() => {
          setEditingId(user.id);
          setEmployeeCode(user.employeeId || "");
        }}
      >
        ✏️
      </button>
    </>
  )}
</td>
            <td style={td}>
              {user.email || "-"}
            </td>

            <td style={td}>
              {user.department || "-"}
            </td>

            <td style={td}>
              {user.designation || "-"}
            </td>

            <td style={td}>
              {user.role || "employee"}
            </td>

            <td style={td}>
              <span
                style={{
                  padding:
                    "6px 12px",
                  borderRadius:
                    "20px",
                  background:
                    user.status ===
                    "inactive"
                      ? "#fee2e2"
                      : "#dcfce7",
                  color:
                    user.status ===
                    "inactive"
                      ? "#dc2626"
                      : "#16a34a",
                  fontWeight: "600",
                }}
              >
                {user.status ||
                  "active"}
              </span>
            </td>

            <td style={td}>
            <div
                style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                }}
            >

                <button
                  style={blackBtn}
                  onClick={() =>
                    window.location.href = `/admin/users/${user.id}`
                  }
                >
                  👁 View
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div
    style={{
      marginTop: "20px",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.08)",
    }}
  >
    <strong>
      Total Employees: {users.length}
    </strong>
  </div>
</div>

);
}

const th = {
textAlign: "left",
padding: "15px",
borderBottom: "1px solid #e5e7eb",
};

const td = {
padding: "15px",
borderBottom: "1px solid #f1f5f9",
};

const blueBtn = {
background: "#2563eb",
color: "#fff",
border: "none",
padding: "8px 12px",
borderRadius: "6px",
cursor: "pointer",
};

const greenBtn = {
background: "#16a34a",
color: "#fff",
border: "none",
padding: "8px 12px",
borderRadius: "6px",
cursor: "pointer",
};

const orangeBtn = {
background: "#f59e0b",
color: "#fff",
border: "none",
padding: "8px 12px",
borderRadius: "6px",
cursor: "pointer",
};

const redBtn = {
background: "#dc2626",
color: "#fff",
border: "none",
padding: "8px 12px",
borderRadius: "6px",
cursor: "pointer",
};

const blackBtn = {
background: "#111827",
color: "#fff",
border: "none",
padding: "8px 12px",
borderRadius: "6px",
cursor: "pointer",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  textAlign: "center",
};