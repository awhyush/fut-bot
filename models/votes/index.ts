import { Schema, model } from "mongoose";
import { IVoteResponse } from "../types";

const voteSchema: Schema<IVoteResponse> = new Schema(
  {
    userId: { type: String, required: true },
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    vote: { type: String, required: true, enum: ["yes", "no"] },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IVoteResponse>("Vote", voteSchema);
