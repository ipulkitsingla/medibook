"use client";

import { useEffect, useState } from "react";
import HospitalCard from "../../components/HospitalCard";

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data));
  }, []);

  const filteredHospitals = hospitals.filter((hospital) => {
    const text = search.toLowerCase();
    return (
      hospital.name?.toLowerCase().includes(text) ||
      hospital.address?.toLowerCase().includes(text) ||
      hospital.departments?.some((d) =>
        d.toLowerCase().includes(text)
      )
    );
  });

  return (
    <section className="all-hospitals">
      <h1>All Hospitals</h1>
      <p>Search and choose the best hospital for you</p>

      <input
        type="text"
        className="search-input"
        placeholder="Search by name, location, or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>
        Showing {filteredHospitals.length} of {hospitals.length} hospitals
      </p>

      <div className="hospital-grid">
        {filteredHospitals.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} />
        ))}

        {filteredHospitals.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No hospitals found
          </p>
        )}
      </div>
    </section>
  );
}
