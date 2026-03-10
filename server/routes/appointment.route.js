import Appointment from "../models/Appointment";

export async function createAppointment(data) {
  return await Appointment.create(data);
}

export async function getAppointments(filter = {}) {
  return await Appointment.find(filter)
    .populate("hospitalId")
    .populate("doctorId");
}
