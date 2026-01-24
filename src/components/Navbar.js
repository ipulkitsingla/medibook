"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="navbar">
      <div className="logo">MediBook</div>

      <ul className="nav-links">
        <li><button className="view-all" onClick={() => router.push("page.js")}>Home</button></li>
        <li><button className="view-all" onClick={() => router.push("/hospitals")}>Hospitals</button></li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="nav-actions">
        <span className="admin">Admin Login</span>
        <button className="btn-primary">Book Appointment</button>
      </div>
    </nav>
  );
}
