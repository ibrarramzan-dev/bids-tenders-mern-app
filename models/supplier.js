import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema(
  {
    companyName: String,
    companyLogo: String,
    scopeOfOperation: [String],
    experience: Number,
    email: String,
    password: String,
    telephone: String,
  },
  {
    timestamps: true,
  }
);

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

export default Supplier;
