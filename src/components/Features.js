export default function Features() {
  return (
    <section className="features">
      <h2>Why Choose MediBook?</h2>
      <p className="subtitle">
        The easiest way to manage your healthcare appointments
      </p>

      <div className="feature-grid">
        <div className="card">
          <h3>Top Hospitals</h3>
          <p>Access verified hospitals and clinics across the city</p>
        </div>

        <div className="card">
          <h3>Expert Doctors</h3>
          <p>Book appointments with experienced specialists</p>
        </div>

        <div className="card">
          <h3>Easy Scheduling</h3>
          <p>Choose your preferred date and time instantly</p>
        </div>

        <div className="card">
          <h3>Secure & Private</h3>
          <p>Your health data is protected with enterprise security</p>
        </div>
      </div>
    </section>
  );
}
