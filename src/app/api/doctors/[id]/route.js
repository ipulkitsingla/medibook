import connectDB from "../../../../../server/config/db";
import Doctor from "../../../../../server/models/Doctor";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return Response.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return Response.json(doctor);
  } catch (error) {
    console.error("Doctor API error:", error);

    return Response.json(
      { error: "Failed to fetch doctor" },
      { status: 500 }
    );
  }
}
