export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MediBook</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Hospitals</li>
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
