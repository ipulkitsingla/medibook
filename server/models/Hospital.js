import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    phone: String,
    openTime: String,
    closeTime: String,
    departments: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Hospital ||
  mongoose.model("Hospital", hospitalSchema);
