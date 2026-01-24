import connectDB from "../../../../server/config/db";
import {
  createHospital,
  getHospitals,
} from "../../../../server/routes/hospital.route";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const hospital = await createHospital(body);
  return Response.json(hospital, { status: 201 });
}

export async function GET() {
  await connectDB();
  const hospitals = await getHospitals();
  return Response.json(hospitals);
}
