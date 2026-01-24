import Hospital from "../models/Hospital";

export async function createHospital(data) {
  return await Hospital.create(data);
}

export async function getHospitals() {
  return await Hospital.find();
}
