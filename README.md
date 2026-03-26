# MediBook 🏥

> A full-stack doctor appointment booking platform built with **Next.js**, **React**, and **MongoDB**.

Patients can browse hospitals, view doctors, and book time slots in under 2 minutes — no account needed. Doctors and hospital admins each get their own secure portal to manage schedules, appointments, and hospital data.

---

## ✨ Features

### For Patients
- Browse hospitals with search (by name, location, or department)
- View all doctors in a hospital with specialization, experience, and fees
- Live calendar showing only the doctor's available days
- Time slot grid that greys out already-booked slots in real time
- Book an appointment without creating an account
- Booking confirmation screen with full appointment details

### For Doctors `/doctor-portal`
- Secure login with email and password
- Dashboard with three tabs: **Today**, **All Appointments**, **Manage Schedule**
- Mark appointments as completed or cancelled
- Toggle available days, update slot duration and consultation fee

### For Hospital Admins `/hospital-admin`
- Secure login with email and password
- Add doctors to the hospital (with optional login credentials created in the same step)
- Remove doctors safely — soft delete preserves appointment history
- View all appointments across all doctors
- Edit hospital info: name, address, phone, departments, opening hours

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19 with Hooks |
| Database | MongoDB Atlas |
| ODM | Mongoose 9 |
| Auth | JWT via `jose` + httpOnly cookies |
| Passwords | `bcryptjs` (10 salt rounds) |
| Icons | `react-icons` |
| Styling | Plain CSS with responsive media queries |

---

## 📁 Project Structure

```
medibook/
├── src/
│   ├── app/
│   │   ├── page.js                         # Homepage
│   │   ├── hospitals/
│   │   │   ├── page.js                     # All hospitals (search + pagination)
│   │   │   └── [hospitalId]/doctors/
│   │   │       └── page.js                 # Hospital detail + doctor list
│   │   ├── doctors/
│   │   │   └── [doctorId]/page.js          # Doctor profile + booking
│   │   ├── doctor-portal/
│   │   │   ├── login/page.js               # Doctor login
│   │   │   └── dashboard/page.js           # Doctor dashboard
│   │   ├── hospital-admin/
│   │   │   ├── login/page.js               # Admin login
│   │   │   └── dashboard/page.js           # Admin dashboard
│   │   └── api/
│   │       ├── hospitals/                  # GET, POST
│   │       ├── doctors/                    # GET, POST, PATCH schedule
│   │       ├── appointments/               # GET, POST, PATCH status
│   │       ├── doctor-auth/                # register, login, logout, me
│   │       └── admin-auth/                 # register, login, logout, me
│   └── components/
│       ├── Navbar.js
│       ├── HospitalCard.js
│       ├── DoctorCard.js
│       ├── BookAppointment.js              # Full booking widget
│       └── skeletons/                      # Loading skeleton components
├── server/
│   ├── models/
│   │   ├── Hospital.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── DoctorAuth.js
│   │   └── AdminAuth.js
│   ├── routes/                             # Reusable DB query helpers
│   └── lib/
│       └── auth.js                         # JWT sign + verify (jose)
├── seed.js                                 # Seeds 5 hospitals + 15 doctors
└── .env.local                              # Environment variables (not committed)
```

---

## 🗄 Database Schema

```
HOSPITAL          DOCTOR               APPOINTMENT
─────────         ──────────           ───────────────
_id (PK)          _id (PK)             _id (PK)
name              hospitalId (FK) ───► HOSPITAL._id
address           name                 hospitalId (FK)
phone             specialization       doctorId (FK) ──► DOCTOR._id
openTime          experience           date
closeTime         consultationFee      time
departments[]     slotDuration         patientName
                  availableDays[]      email
                  isActive             phone
                                       reason
                                       status

DOCTOR_AUTH       ADMIN_AUTH
───────────       ──────────
_id (PK)          _id (PK)
doctorId (FK)     hospitalId (FK)
email             email
password (hash)   password (hash)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/medibook.git
cd medibook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/
JWT_SECRET=your-long-random-secret-string
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Seed the database

Make sure the dev server is running, then in a second terminal:

```bash
node seed.js
```

This creates **5 hospitals** with **3 doctors each** and sets up admin + doctor login credentials.

---

## 🔐 Demo Credentials

After running the seed script, use these to log in:

### Hospital Admin Portals → `/hospital-admin/login`

| Hospital | Email | Password |
|----------|-------|----------|
| Apollo Multispecialty | admin@apollo.com | apollo123 |
| Fortis Escorts | admin@fortis.com | fortis123 |
| Max Super Speciality | admin@max.com | max12345 |
| Ivy Hospital | admin@ivy.com | ivy12345 |
| Civil Hospital | admin@civil.com | civil123 |

### Doctor Portals → `/doctor-portal/login`

All doctor passwords are `doctor123`. Emails follow the pattern `firstname@hospital.com`.

| Doctor | Email |
|--------|-------|
| Dr. Rajesh Sharma | rajesh@apollo.com |
| Dr. Priya Mehta | priya@apollo.com |
| Dr. Sunita Bhatia | sunita@fortis.com |
| Dr. Harpreet Gill | harpreet@max.com |
| Dr. Gurpreet Sandhu | gurpreet@ivy.com |
| Dr. Balwinder Johal | balwinder@civil.com |

---

## 📡 API Reference

### Hospitals
```
GET    /api/hospitals              List all (supports ?page=1&limit=12)
POST   /api/hospitals              Create hospital
GET    /api/hospitals/:id          Get one hospital
```

### Doctors
```
GET    /api/doctors                List all (supports ?hospitalId=...)
POST   /api/doctors                Create doctor
GET    /api/doctors/:id            Get one doctor
PATCH  /api/doctors/:id/schedule   Update schedule (auth required)
```

### Appointments
```
GET    /api/appointments           List (filter: ?doctorId, ?date, ?hospitalId)
POST   /api/appointments           Book appointment
PATCH  /api/appointments/:id       Update status (auth required)
```

### Doctor Auth
```
POST   /api/doctor-auth/register   Create doctor credentials
POST   /api/doctor-auth/login      Login → sets cookie
POST   /api/doctor-auth/logout     Logout → clears cookie
GET    /api/doctor-auth/me         Get logged-in doctor
```

### Admin Auth
```
POST   /api/admin-auth/register    Create admin credentials
POST   /api/admin-auth/login       Login → sets cookie
POST   /api/admin-auth/logout      Logout → clears cookie
GET    /api/admin-auth/me          Get logged-in hospital
```

### Admin Actions (auth required)
```
POST   /api/admin/doctors          Add doctor to hospital
DELETE /api/admin/doctors/:id      Remove doctor (soft delete)
PATCH  /api/admin/hospitals/:id    Update hospital settings
```

---

## 🔒 Security

- Passwords are hashed with **bcryptjs** (10 salt rounds) — never stored in plain text
- JWTs are stored in **httpOnly cookies** — inaccessible to JavaScript, safe from XSS
- Protected routes verify the JWT on every request using `jose`
- Doctors can only modify their own schedule and appointments
- Admins can only modify their own hospital's data
- Soft delete (isActive: false) preserves appointment history when doctors are removed

---

## 📱 Responsive Design

The app is fully responsive across desktop, tablet, and mobile:
- Navbar collapses on small screens
- Hospital and doctor grids go single-column on mobile
- Booking calendar and form stack vertically on small viewports
- Doctor and admin dashboards reflow to column layout

---

## 🧱 Build for Production

```bash
npm run build
npm run start
```

---

## 🌱 Future Improvements

- [ ] Email confirmation after booking (Nodemailer / SendGrid)
- [ ] Unique compound index on `(doctorId, date, time)` to prevent race-condition double bookings
- [ ] Patient accounts for booking history
- [ ] Real-time slot updates via Server-Sent Events
- [ ] Doctor ratings and reviews
- [ ] Map view for hospitals (Google Maps / Leaflet)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with Next.js · MongoDB · React</p>