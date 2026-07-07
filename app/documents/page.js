"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { generatePayslip } from "../../lib/generatePayslip";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export default function PayslipPage() {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const downloadPayslip = (item) => {

  const pdf = generatePayslip(item);

  pdf.save(
    `${item.employeeName}-${item.month}.pdf`
  );

};



useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (user) => {

    if (!user) {
      setLoading(false);
      return;
    }

    loadPayslips(user);

  });

  return () => unsubscribe();

}, []);

const loadPayslips = async (user) => {

  console.log("Logged in email:", user.email);

  const userQuery = query(
    collection(db, "users"),
    where("email", "==", user.email)
  );

  const userSnapshot = await getDocs(userQuery);

  console.log("User docs:", userSnapshot.docs.length);

  if (userSnapshot.empty) {
    console.log("User not found");
    setLoading(false);
    return;
  }

  const employee = userSnapshot.docs[0].data();

  console.log("Employee Data:", employee);

  const payrollQuery = query(
    collection(db, "payroll"),
    where("employeeId", "==", employee.employeeId)
  );

  const payrollSnapshot = await getDocs(payrollQuery);

  console.log("Payroll docs:", payrollSnapshot.docs.length);

  const list = payrollSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(list);

  setPayslips(list);

  setLoading(false);
};


  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 30,
      }}
    >
      <h1>📄 My Payslips</h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Month</th>
            <th style={th}>Basic</th>
            <th style={th}>Allowance</th>
            <th style={th}>Tax</th>
            <th style={th}>Leave Deduction</th>
            <th style={th}>Net Salary</th>
            <th style={th}>Payslip</th>
          </tr>
        </thead>

        <tbody>
          {payslips.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Payslips Available
              </td>
            </tr>
          ) : (
            payslips.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.month}</td>
                <td style={td}>₹ {item.basicSalary}</td>
                <td style={td}>₹ {item.allowance}</td>
                <td style={td}>₹ {item.tax}</td>
                <td style={td}>₹ {item.leaveDeduction}</td>
                <td style={{ ...td, fontWeight: "bold", color: "#16a34a" }}>
                  ₹ {item.netSalary}
                </td>

                <td style={td}>

<button

onClick={() => downloadPayslip(item)}

style={downloadBtn}

>

Download PDF

</button>

</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "15px",
  background: "#2563eb",
  color: "#fff",
  textAlign: "left",
  fontWeight: "bold",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};

const downloadBtn={

background:"#2563eb",

color:"#fff",

padding:"10px 18px",

border:"none",

borderRadius:"8px",

cursor:"pointer",

fontWeight:"bold"

};

