"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeaturedHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data.slice(0, 3)));
  }, []);

  return (
    <section className="featured">
      <div className="featured-header">
        <div>
          <h2>Featured Hospitals</h2>
          <p>Top-rated healthcare facilities</p>
        </div>

        <button
          className="view-all"
          onClick={() => router.push("/hospitals")}
        >
          View All →
        </button>
      </div>

      <div className="hospital-grid">
        {hospitals.map((hospital) => (
          <div className="hospital-card" key={hospital._id}>
            <div className="hospital-banner">
              <div className="hospital-icon">
                {hospital.name.charAt(0)}
              </div>

              <div className="tags">
                {hospital.departments?.slice(0, 2).map((dep, i) => (
                  <span key={i}>{dep}</span>
                ))}
                {hospital.departments?.length > 2 && (
                  <span>+{hospital.departments.length - 2}</span>
                )}
              </div>
            </div>

            <div className="hospital-body">
              <h3>{hospital.name}</h3>
              <p>{hospital.address}</p>
              <p>{hospital.openTime} - {hospital.closeTime}</p>
              <p>{hospital.phone}</p>
            </div>

            <button
              className="btn-primary full-width"
              onClick={() => router.push(`/hospitals/${hospital._id}/doctors`)}
            >
              View Doctors →
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}
