"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DoctorCard from "../../../../components/DoctorCard";

export default function DoctorsPage() {
  const { hospitalId } = useParams();
  const router = useRouter();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/doctors?hospitalId=${hospitalId}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hospitalId]);

  if (loading) {
    return <p style={{ padding: "60px" }}>Loading doctors...</p>;
  }

  return (
    <section className="all-hospitals">
      <h1>Our Doctors</h1>
      <p>{doctors.length} doctors available</p>

      <div className="hospital-grid">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onBook={() =>
              router.push(`/book/${doctor._id}`)
            }
          />
        ))}

        {doctors.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No doctors found for this hospital
          </p>
        )}
      </div>
    </section>
  );
}
