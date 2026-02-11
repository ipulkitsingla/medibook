"use client";

import { useEffect, useMemo, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

function parseTimeToMinutes(value) {
  if (!value) return null;
  const trimmed = String(value).trim().toUpperCase();

  // Formats like "9:00 AM", "09:30PM", "9 AM"
  const match = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/);
  if (match) {
    let hour = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const ampm = match[3];

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    return hour * 60 + minutes;
  }

  // Fallback: "HH:MM" 24h
  const parts = trimmed.split(":").map(Number);
  if (parts.length === 2 && !parts.some(Number.isNaN)) {
    return parts[0] * 60 + parts[1];
  }

  return null;
}

function generateTimeSlots(openTime, closeTime, slotDuration) {
  if (!openTime || !closeTime || !slotDuration) return [];

  const startMinutes = parseTimeToMinutes(openTime);
  const endMinutes = parseTimeToMinutes(closeTime);

  if (startMinutes == null || endMinutes == null) return [];

  const slots = [];
  for (let t = startMinutes; t + slotDuration <= endMinutes; t += slotDuration) {
    const hour24 = Math.floor(t / 60);
    const minutes = t % 60;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    const label = `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    slots.push(label);
  }

  return slots;
}

function startOfDay(d) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function normalizeAvailableDays(availableDays) {
  if (!Array.isArray(availableDays) || availableDays.length === 0) return null;
  return new Set(availableDays.map((d) => String(d).slice(0, 3).toLowerCase()));
}

function isDateSelectable({ date, today, allowedSet }) {
  const dateDay = startOfDay(date);
  const todayDay = startOfDay(today);
  if (dateDay < todayDay) return false;

  if (!allowedSet) return true;
  const weekdayLong = date.toLocaleDateString("en-US", { weekday: "long" });
  const weekdayShort = weekdayLong.slice(0, 3).toLowerCase();
  return allowedSet.has(weekdayShort);
}

function buildMonthCells({ year, month, today, allowedSet }) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const leadingBlanks = firstDay.getDay(); // 0=Sun..6=Sat
  const totalCells = 42; // 6 rows * 7 columns

  const cells = [];

  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({ kind: "blank", key: `b-${i}` });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const selectable = isDateSelectable({ date, today, allowedSet });
    cells.push({
      kind: "day",
      key: date.toISOString(),
      date,
      isAvailable: selectable,
    });
  }

  while (cells.length < totalCells) {
    cells.push({ kind: "blank", key: `t-${cells.length}` });
  }

  return cells;
}

export default function BookAppointment({ doctor, hospital }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  const allowedSet = useMemo(
    () => normalizeAvailableDays(doctor?.availableDays || []),
    [doctor?.availableDays]
  );

  const cells = useMemo(
    () =>
      buildMonthCells({
        year: viewYear,
        month: viewMonth,
        today,
        allowedSet,
      }),
    [viewYear, viewMonth, today, allowedSet]
  );

  const timeSlots = useMemo(
    () =>
      generateTimeSlots(
        hospital?.openTime || "09:00",
        hospital?.closeTime || "17:00",
        doctor?.slotDuration || 30
      ),
    [hospital?.openTime, hospital?.closeTime, doctor?.slotDuration]
  );

  useEffect(() => {
    // Preselect the first available date in the current view month (if any).
    if (selectedDate) return;
    const firstAvailable = cells.find(
      (c) => c.kind === "day" && c.isAvailable
    );
    if (firstAvailable?.date) setSelectedDate(firstAvailable.date);
  }, [cells, selectedDate]);

  useEffect(() => {
    // If user changes month, reset time selection.
    setSelectedTime("");
    setError("");
    setSuccess("");
  }, [selectedDate]);

  async function handleBook() {
    if (!selectedDate || !selectedTime) {
      setError("Please select both a date and time.");
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: hospital?._id || doctor?.hospitalId,
          doctorId: doctor?._id,
          date: selectedDate.toISOString().slice(0, 10),
          time: selectedTime,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create appointment");
      }

      setSuccess("Appointment booked successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not book appointment. Please try again.");
      setSuccess("");
    } finally {
      setSubmitting(false);
    }
  }

  const monthLabel = new Date(viewYear, viewMonth, 1);

  const canGoPrev = (() => {
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const viewMonthStart = new Date(viewYear, viewMonth, 1);
    return viewMonthStart > currentMonthStart;
  })();

  function goPrevMonth() {
    if (!canGoPrev) return;
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setSelectedDate(null);
    setSelectedTime("");
  }

  function goNextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setSelectedDate(null);
    setSelectedTime("");
  }

  return (
    <section className="ap-booking">
      <h2 className="ap-title">Book an Appointment</h2>

      <div className="ap-step-card">
        <div className="ap-step-header">
          <h3>Step 1: Select Date &amp; Time</h3>
          <p>Choose your preferred appointment slot</p>
        </div>

        <div className="ap-grid">
          {/* Select Date */}
          <div className="ap-panel">
            <div className="ap-panel-title">
              <FaRegCalendarAlt />
              <span>Select Date</span>
            </div>

            <div className="ap-calendar">
              <div className="ap-calendar-nav">
                <button
                  type="button"
                  className="ap-nav-btn"
                  onClick={goPrevMonth}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                >
                  ‹
                </button>

                <div className="ap-month">
                  {monthLabel.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <button
                  type="button"
                  className="ap-nav-btn"
                  onClick={goNextMonth}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              <div className="ap-calendar-grid">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="ap-dow">
                    {d}
                  </div>
                ))}

                {cells.map((cell) => {
                  if (cell.kind === "blank") {
                    return <div key={cell.key} className="ap-blank" />;
                  }

                  const isSelected =
                    selectedDate &&
                    cell.date.toDateString() === selectedDate.toDateString();

                  const classes = [
                    "ap-day",
                    !cell.isAvailable && "disabled",
                    isSelected && "active",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={cell.key}
                      type="button"
                      className={classes}
                      disabled={!cell.isAvailable}
                      onClick={() => {
                        if (!cell.isAvailable) return;
                        setSelectedDate(cell.date);
                      }}
                    >
                      {cell.date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Select Time */}
          <div className="ap-panel">
            <div className="ap-panel-title">
              <IoTimeOutline />
              <span>Select Time</span>
            </div>

            {!selectedDate ? (
              <div className="ap-empty">Please select a date first</div>
            ) : (
              <>
                <div className="ap-time-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={
                        "ap-time" + (slot === selectedTime ? " active" : "")
                      }
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="ap-confirm"
                  onClick={handleBook}
                  disabled={submitting || !selectedTime}
                >
                  {submitting ? "Booking..." : "Confirm Appointment"}
                </button>
              </>
            )}

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

