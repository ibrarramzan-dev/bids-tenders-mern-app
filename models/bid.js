import mongoose, { Schema } from "mongoose";

const membersSchema = new Schema({
  name: String,
  email: String,
});

const savedToSchema = new Schema({
  supplierId: String,
});

const appliedBySchema = new Schema({
  supplierId: String,
  comments: String,
  financialDoc: String,
  technicalDoc: String,
  otherDocs: [String],
});

const bidSchema = new Schema(
  {
    clientId: String,
    classification: [String],
    agencyName: String,
    agencyLogo: String,
    title: String,
    type: String,
    region: String,
    city: String,
    submissionClosingDate: String,
    description: String,
    status: String,
    attachments: [String],
    submissionLinkOrEmail: String,
    featured: Boolean,
    eTendering: Boolean,
    members: [membersSchema],
    accessKey: String,
    savedTo: [savedToSchema],
    appliedBy: [appliedBySchema],
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);

export default Bid;
