import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  email: String,
  password: String,
});

const clientSchema = new Schema(
  {
    agencyName: String,
    agencyLogo: String,
    email: String,
    password: String,
    telephone: String,
    members: [memberSchema],
    subscription: {
      type: String,
      enum: ["Starter", "Standard", "Premium"],
      default: "Starter",
    },
    members: {
      type: [],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
