import connectDB from "../../../../server/config/db";
import {
  createAppointment,
  getAppointments,
} from "../../../../server/routes/appointment.route";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const appointment = await createAppointment(body);
  return Response.json(appointment, { status: 201 });
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  const filter = {};
  if (doctorId) {
    filter.doctorId = doctorId;
  }
  if (date) {
    filter.date = date;
  }

  const appointments = await getAppointments(filter);
  return Response.json(appointments);
}
