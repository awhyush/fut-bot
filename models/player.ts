import mongoose, { Schema } from "mongoose";
import { IPlayer } from "./types";

const playerSchema: Schema = new mongoose.Schema({
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
  userId: { type: String, required: false },
  role: { type: String, required: true, enum: ["Player", "Admin"] },
});

export default mongoose.model<IPlayer>("Player", playerSchema);
