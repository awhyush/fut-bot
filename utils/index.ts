import mongoose from "mongoose";
import Player from "../models/player";
import { IPlayer } from "../models/types";
import "dotenv/config";

interface IModifiedPlayer {
  name: string;
  skill: IPlayer["skill"];
  rating: IPlayer["rating"];
  playerScore: string;
}

let modifiedPlayerData: IModifiedPlayer[] = [];

const uri: string = process.env.MONGODB_URI || "";

if (!uri) {
  console.error("MONGODB_URI is not defined.");
}

try {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const players: IPlayer[] = await Player.find({}).exec();

  modifiedPlayerData = players.map((p: IPlayer) => {
    return {
      name: p.name,
      skill: p.skill,
      rating: p.rating,
      playerScore: p.playerScore,
    };
  });

  mongoose.connection.close();
  console.log("Connection closed");
} catch (error) {
  const err = error as Error;
  console.error("An error occurred during database operations:", err.message);
}

export { modifiedPlayerData };
