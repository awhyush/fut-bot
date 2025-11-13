import mongoose from "mongoose";

const reponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameDate: { type: String, required: true },
  vote: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

export default mongoose.model("Response", reponseSchema);
