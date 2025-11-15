import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for the document instance, extending mongoose.Document
// This provides type safety when interacting with the Response model.
export interface IVoteResponse extends Document {
  userId: string;
  gameDate: string;
  vote: "yes" | "no"; // Restrict vote value to these two literals
  timestamp: Date;
}

// Define the Mongoose Schema
const reponseSchema: Schema = new mongoose.Schema({
  // Stored as string to handle IDs consistently
  userId: { type: String, required: true },
  // Stored as a string (e.g., "2025-11-15")
  gameDate: { type: String, required: true },
  vote: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

// Export the Mongoose Model, typed with the IVoteResponse interface
export default mongoose.model < IVoteResponse > ("Response", reponseSchema);
