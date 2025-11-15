import mongoose from "mongoose";
import Player from "../models/player/index.ts";
import "dotenv/config";
import { IPlayer } from "../models/types.ts";

async function seedPlayers() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Player.deleteMany({});
    console.log("🗑 Cleared existing data");

    const samplePlayers: IPlayer[] = [
      {
        name: "Messi",
        skill: "Attacking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000001",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "De Bruyne",
        skill: "Playmaking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000002",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Casemiro",
        skill: "Defending",
        rating: "Good",
        playerScore: "3/5",
        telegramId: "1000000003",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Van Dijk",
        skill: "Defending",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000004",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alisson",
        skill: "Goalkeeping",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000005",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Messi2",
        skill: "Attacking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1039849771", // Admin's telegram ID
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "De Bruyne2",
        skill: "Playmaking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000006",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Casemiro2",
        skill: "Defending",
        rating: "Good",
        playerScore: "3/5",
        telegramId: "1000000007",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Van Dijk2",
        skill: "Defending",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000008",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alisson2",
        skill: "Goalkeeping",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000009",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Messi3",
        skill: "Attacking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000010",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "De Bruyne3",
        skill: "Playmaking",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000011",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Casemiro3",
        skill: "Defending",
        rating: "Good",
        playerScore: "3/5",
        telegramId: "1000000012",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Van Dijk3",
        skill: "Defending",
        rating: "Excellent",
        playerScore: "4/5",
        telegramId: "1000000013",
        role: "Player",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Player.insertMany(samplePlayers);
    console.log("✅ Sample data inserted");

    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error seeding players:", (err as Error).message);
    process.exit(1);
  }
}

seedPlayers();
