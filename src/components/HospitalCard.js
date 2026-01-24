"use client";

import { useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { IoCall } from "react-icons/io5";

export default function HospitalCard({ hospital }) {
  const router = useRouter();

  const initials = hospital.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 1);

  return (
    <div className="hospital-card">
      <div className="hospital-top">
        <div className="hospital-icon">{initials}</div>

        <div className="hospital-tags">
          {hospital.departments?.slice(0, 2).map((dep, i) => (
            <span key={i}>{dep}</span>
          ))}
          {hospital.departments?.length > 2 && (
            <span>+{hospital.departments.length - 2}</span>
          )}
        </div>
      </div>

      <div className="hospital-content">
        <h3>{hospital.name}</h3>

        <p><FaLocationDot /> {hospital.address}</p>
        <p><IoTime/> {hospital.openTime} - {hospital.closeTime}</p>
        <p><IoCall/> {hospital.phone}</p>
      </div>

      <button
        className="btn-primary hospital-btn"
        onClick={() =>
          router.push(`/hospitals/${hospital._id}/doctors`)
        }
      >
        View Doctors →
      </button>
    </div>
  );
}
