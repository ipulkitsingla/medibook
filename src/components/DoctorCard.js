import { FaCalendarAlt } from "react-icons/fa";

export default function DoctorCard({ doctor, onBook }) {
  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <div className="doctor-avatar">{initials}</div>

        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p className="specialization">🩺 {doctor.specialization}</p>
          <p className="experience">
            {doctor.experience} years experience
          </p>
        </div>
      </div>

      <div className="doctor-stats">
        <div className="stat-box">
          <span className="label">₹ Consultation</span>
          <strong>₹{doctor.consultationFee}</strong>
        </div>

        <div className="stat-box">
          <span className="label">⏱ Slot Duration</span>
          <strong>{doctor.slotDuration} min</strong>
        </div>
      </div>

      <div className="available-days">
        <span className="label"><FaCalendarAlt /> Available Days</span>

        <div className="days">
          {doctor.availableDays.map((day, index) => (
            <span key={index} className="day-pill">
              {day}
            </span>
          ))}
        </div>
      </div>

      <button className="btn-primary book-btn" onClick={onBook}>
        Book Appointment
      </button>
    </div>
  );
}
