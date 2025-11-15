import mongoose, { Schema } from "mongoose";
import { IGameHistory } from "../types";

const GameHistorySchema: Schema<IGameHistory> = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
  date: { type: Date, required: true },
  teamA: { type: [String], required: true },
  teamB: { type: [String], required: true },
  result: { type: String, required: true },
});

export default mongoose.model<IGameHistory>("GameHistory", GameHistorySchema);
