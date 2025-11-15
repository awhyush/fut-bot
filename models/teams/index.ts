import mongoose, { Schema } from "mongoose";
import { ITeams } from "../types";

const teamsSchema: Schema<ITeams> = new Schema(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    teamName: { type: String, required: true },
    color: { type: String, required: true },
    captainId: { type: String, required: true },
    memberIds: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeams>("Teams", teamsSchema);
