import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skill: {
    type: String,
    required: true,
    enum: ["Attacking", "Defending", "Goalkeeping", "Playmaking"],
  },
  rating: {
    type: String,
    required: true,
    enum: ["Average", "Good", "Excellent"],
  },
  playerScore: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export default mongoose.model("Player", playerSchema);
