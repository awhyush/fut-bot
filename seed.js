import mongoose from "mongoose";
import Player from "./models/player.js";
import "dotenv/config";

await mongoose.connect(process.env.MONGODB_URI);

console.log("Connected to MongoDB");

await Player.deleteMany({});
console.log("Cleared existing data");

const samplePlayers = [
  {
    name: "Messi",
    skill: "Attacking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "De Bruyne",
    skill: "Playmaking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  { name: "Casemiro", skill: "Defending", rating: "Good", playerScore: "3/5" },
  {
    name: "Van Dijk",
    skill: "Defending",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "Alisson",
    skill: "Goalkeeping",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "Messi2",
    skill: "Attacking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "De Bruyne2",
    skill: "Playmaking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  { name: "Casemiro2", skill: "Defending", rating: "Good", playerScore: "3/5" },
  {
    name: "Van Dijk2",
    skill: "Defending",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "Alisson2",
    skill: "Goalkeeping",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "Messi3",
    skill: "Attacking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  {
    name: "De Bruyne3",
    skill: "Playmaking",
    rating: "Excellent",
    playerScore: "4/5",
  },
  { name: "Casemiro3", skill: "Defending", rating: "Good", playerScore: "3/5" },
  {
    name: "Van Dijk3",
    skill: "Defending",
    rating: "Excellent",
    playerScore: "4/5",
  },
];

await Player.insertMany(samplePlayers);
console.log("Sample data inserted");
mongoose.connection.close();
