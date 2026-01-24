import Appointment from "../models/Appointment";

export async function createAppointment(data) {
  return await Appointment.create(data);
}

export async function getAppointments() {
  return await Appointment.find()
    .populate("hospitalId")
    .populate("doctorId");
}
