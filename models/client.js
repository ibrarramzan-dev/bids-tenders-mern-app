import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  email: String,
  password: String,
});

const clientSchema = new Schema(
  {
    agencyName: String,
    companyLogo: String,
    email: String,
    password: String,
    telephone: String,
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
