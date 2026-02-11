"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FaUserMd } from "react-icons/fa";
import { PiHospitalBold } from "react-icons/pi";
import { FaStethoscope } from "react-icons/fa";
import {
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import BookAppointment from "@/components/BookAppointment";

export default function DoctorPage() {
  const { doctorId } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const doctorRes = await fetch(`/api/doctors/${doctorId}`);
        const doctorData = await doctorRes.json();
        setDoctor(doctorData);

        if (doctorData?.hospitalId) {
          const hospitalRes = await fetch(
            `/api/hospitals/${doctorData.hospitalId}`
          );
          const hospitalData = await hospitalRes.json();
          setHospital(hospitalData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    loadData();
  }, [doctorId]);

  if (loading) {
    return <p style={{ padding: "60px" }}>Loading doctor...</p>;
  }

  if (!doctor) {
    return <p style={{ padding: "60px" }}>Doctor not found</p>;
  }

  return (
    <div className="doctor-page">

      <div className="back-wrapper">
        <button
          className="back-btn"
          onClick={() =>
            hospital
              ? router.push(`/hospitals/${hospital._id}/doctors`)
              : router.back()
          }
        >
          <IoIosArrowBack className="back-icon" />
          <span>
            Back to {hospital?.name || "Hospital"}
          </span>
        </button>
      </div>

      <div className="doctor-header">
        <div className="doctor-avatar">
          {<CgProfile />}
        </div>

        <div className="doctor-info">
          <h1>{doctor.name}</h1>
          <p className="doctor-spec"> <FaStethoscope /> {doctor.specialization}</p>

          <div className="doctor-meta">
            <span><PiHospitalBold />{hospital?.name}</span>
            <span>₹{doctor.consultationFee}</span>
            <span><IoTimeOutline />{doctor.slotDuration} min slots</span>
          </div>
          {doctor.availableDays?.length > 0 && (
            <div className="doctor-days">
              <p>Available Days:</p>
              <div className="day-tags">
                {doctor.availableDays.map((day, i) => (
                  <span key={i}>{day}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BookAppointment doctor={doctor} hospital={hospital} />

    </div>
  );
}
