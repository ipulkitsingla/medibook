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

export async function GET() {
  await connectDB();
  const appointments = await getAppointments();
  return Response.json(appointments);
}
