import mongoose, { Schema } from "mongoose";

const bidSchema = new Schema(
  {
    bidClassification: String,
    agencyName: String,
    title: String,
    type: String,
    region: String,
    city: String,
    closingDate: String,
    description: String,
    eTendering: Boolean,
    submissionLink: String,
    submissionEmail: String,
    isPublished: Boolean,
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);

export default Bid;
