import mongoose from "mongoose";
import Player from "./models/player.js";
import "dotenv/config";

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to MongoDB");

//get all players data
const players = await Player.find({});

const modifiedPlayerData = players.map((p) => {
  return {
    name: p.name,
    skill: p.skill,
    rating: p.rating,
    playerScore: p.playerScore,
  };
});

mongoose.connection.close();
console.log("Connection closed");

export { modifiedPlayerData };
