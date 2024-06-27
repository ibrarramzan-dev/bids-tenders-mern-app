import mongoose, { Schema } from "mongoose";

const membersSchema = new Schema({
  name: String,
  email: String,
});

const bidSchema = new Schema(
  {
    classification: [String],
    agencyName: String,
    title: String,
    type: String,
    region: String,
    city: String,
    submissionClosingDate: String,
    description: String,
    attachments: [String],
    submissionLinkOrEmail: String,
    featured: Boolean,
    eTendering: Boolean,
    members: [membersSchema],
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);

export default Bid;
