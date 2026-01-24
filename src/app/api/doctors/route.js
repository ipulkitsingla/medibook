import connectDB from "../../../../server/config/db";
import Doctor from "../../../../server/models/Doctor";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const doctor = await Doctor.create(body);
    return Response.json(doctor, { status: 201 });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const hospitalId = searchParams.get("hospitalId");

  const query = hospitalId ? { hospitalId } : {};
  const doctors = await Doctor.find(query);

  return Response.json(doctors);
}
