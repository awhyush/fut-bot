import mongoose, { Schema } from "mongoose";
import { IPlayer } from "../types.js";

const playerSchema: Schema<IPlayer> = new Schema(
  {
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
    telegramId: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["Player", "Admin"] },
    contactNumber: { type: String, required: false },
  },
  { timestamps: true }
);
export default mongoose.model<IPlayer>("Player", playerSchema);
