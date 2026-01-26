"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="navbar">
      <div className="logo"><button onClick={() => router.push("/")}>MediBook</button></div>

      <ul className="nav-links">
        <li><button className="view-all" onClick={() => router.push("/")}>Home</button></li>
        <li><button className="view-all" onClick={() => router.push("/hospitals")}>Hospitals</button></li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="nav-actions">
        <button className="btn-primary" onClick={() => router.push("/hospitals")}>Book Appointment</button>
      </div>
    </nav>
  );
}
