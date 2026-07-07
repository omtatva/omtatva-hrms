"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LogoutButton() {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <button
      onClick={logout}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}