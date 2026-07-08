"use client";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [employeeId, setEmployeeId] = useState("");
const [department, setDepartment] = useState("");
const [designation, setDesignation] = useState("");
const [phone, setPhone] = useState("");
const [emergencyContact, setEmergencyContact] = useState("");
const [emergencyPhone, setEmergencyPhone] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [country, setCountry] = useState("India");
const [dob, setDob] = useState("");
const [joiningDate, setJoiningDate] = useState("");
const [gender, setGender] = useState("");
const [bloodGroup, setBloodGroup] = useState("");
const [linkedin, setLinkedin] = useState("");
  // const [employeeId, setEmployeeId] = useState("");
  // const [department, setDepartment] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [phone, setPhone] = useState("");
  
  const saveProfile = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Please Login");
    return;
  }

  try {
    console.log(user.uid);
    await updateDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  email: user.email,
  photoURL: user.photoURL,

  firstName,
  lastName,
  employeeId,
  department,
  designation,

  phone,
  emergencyContact,
  emergencyPhone,

  address,
  city,
  state,
  country,

  dob,
  joiningDate,
  gender,
  bloodGroup,


  linkedin,

  role: "Employee",
  status: "Active",

  profileCompleted: true,
  updatedAt: new Date(),
});

    alert("Profile Saved Successfully");

    window.location.href="/dashboard";

  } catch (error) {

    console.error(error);

    alert("Failed to Save Profile");

  }

};

  const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "14px",
};

  return (
  <div
    style={{
      minHeight: "90vh",
      background: "#f8fafc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#0f172a",
          }}
        >
          Complete Your Profile
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
          }}
        >
          Please complete your employee information before
          accessing Attendance and Timesheets.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div>
        <label>First Name</label>

        <input
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          style={inputStyle}
        />
        </div>

        <div>
        <label>Last Name</label>

        <input
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          style={inputStyle}
        />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            style={inputStyle}
          />
        </div>

        <div>
        <label>Emergency Contact</label>

        <input
          value={emergencyContact}
          onChange={(e)=>setEmergencyContact(e.target.value)}
          style={inputStyle}
        />
        </div>

        <div>
        <label>Emergency Phone</label>

        <input
          value={emergencyPhone}
          onChange={(e)=>setEmergencyPhone(e.target.value)}
          style={inputStyle}
        />
        </div>

        <div style={{gridColumn:"1 / span 2"}}>
        <label>Address</label>
        <input
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        style={inputStyle}
        />
        </div>

        <div>
        <label>City</label>
        <input
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={inputStyle}
        />
        </div>
        
        <div>
        <label>State</label>
        <input
        value={state}
        onChange={(e)=>setState(e.target.value)}
        style={inputStyle}
        />
        </div>

        <div>
        <label>Country</label>
        <input
        value={country}
        onChange={(e)=>setCountry(e.target.value)}
        style={inputStyle}
        />
        </div>

        <div>
        <label>Date of Birth</label>
        <input
        type="date"
        value={dob}
        onChange={(e)=>setDob(e.target.value)}
        style={inputStyle}
        />
        </div>

        <div>
        <label>Joining Date</label>
        <input
        type="date"
        value={joiningDate}
        onChange={(e)=>setJoiningDate(e.target.value)}
        style={inputStyle}
        />
        </div>

        <div>
        <label>Gender</label>

        <select
        value={gender}
        onChange={(e)=>setGender(e.target.value)}
        style={inputStyle}
        >
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
        </select>

        </div>

        <div>
        <label>Blood Group</label>

        <select
        value={bloodGroup}
        onChange={(e)=>setBloodGroup(e.target.value)}
        style={inputStyle}
        >
        <option value="">Select</option>
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>AB+</option>
        <option>AB-</option>
        <option>O+</option>
        <option>O-</option>
        </select>

        </div>

        <div>
        <label>LinkedIn</label>

        <input
        value={linkedin}
        onChange={(e)=>setLinkedin(e.target.value)}
        placeholder="https://linkedin.com/in/..."
        style={inputStyle}
        />
        </div>
      </div>

      <button
        onClick={saveProfile}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "15px",
          border: "none",
          borderRadius: "12px",
          background: "#2563eb",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Save Profile & Continue
      </button>
    </div>
  </div>
);
}