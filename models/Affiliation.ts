import mongoose from "mongoose";


const AffiliationSchema = new mongoose.Schema(
{
userId: { type: String, required: true, index: true },
programType: { type: String, enum: ["affiliate", "reseller", "partner", "institution", "individual"], default: "affiliate" },
companyName: { type: String },
website: { type: String },
fullName: { type: String, required: true },
email: { type: String, required: true },
phone: { type: String },
country: { type: String },
address: { type: String },
city: { type: String },
postalCode: { type: String },
taxId: { type: String },
payoutMethod: { type: String, enum: ["paypal", "bank", "upi", "other"] },
payoutDetails: { type: mongoose.Schema.Types.Mixed },
promoSlug: { type: String, index: true },
status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
notes: { type: String },
proofFiles: [{ type: String }],
},
{ timestamps: true }
);


const Affiliation = (mongoose.models.Affiliation as mongoose.Model<any>) || mongoose.model("Affiliation", AffiliationSchema);
export default Affiliation;