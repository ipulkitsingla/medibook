import Doctor from "../models/Doctor";

export async function createDoctor(data) {
  return await Doctor.create(data);
}

export async function getDoctors() {
  return await Doctor.find().populate("hospitalId");
}
