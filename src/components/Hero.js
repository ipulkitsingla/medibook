"use client";
import styles from "./Hero.module.css";
import { useRouter } from "next/navigation";


export default function Hero() {
  const router = useRouter();

  return (
    <section className="hero">
      <span className="badge">Book in under 2 minutes</span>

      <h1 className={styles.animated_text}>
        Your Health, <br />
        <span>Our Priority </span>
      </h1>

      <p className={styles.animated_text}>
        Book appointments with top doctors at leading hospitals.
        Simple, fast, and secure healthcare scheduling.
      </p>

      <div className="hero-buttons">
        <button className="btn-primary" onClick={() => router.push("/hospitals")}>Find a Hospital →</button>
        <button className="btn-outline">Learn More</button>
      </div>
    </section>
  );
}
