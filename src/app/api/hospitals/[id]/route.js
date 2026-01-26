import connectDB from "../../../../../server/config/db";
import Hospital from "../../../../../server/models/Hospital";

export async function GET(req, context) {
  await connectDB();

  // ✅ params is a Promise in new Next.js
  const { id } = await context.params;

  const hospital = await Hospital.findById(id);

  if (!hospital) {
    return Response.json(
      { message: "Hospital not found" },
      { status: 404 }
    );
  }

  return Response.json(hospital);
}
