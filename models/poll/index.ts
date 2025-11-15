import mongoose, { Schema } from "mongoose";
import { IPlayer, IPoll } from "../types";

const pollSchema: Schema<IPoll> = new Schema(
  {
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ["open", "closed"] },
  },
  { timestamps: true }
);
export default mongoose.model<IPoll>("Poll", pollSchema);
