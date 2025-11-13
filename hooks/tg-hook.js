import express from "express";
import dotenv from "dotenv";
import Response from "../models/voteResponse.js";
import { sendMessage } from "../services/tg-service.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
  const update = req.body;
  console.log("📩 Received update:", JSON.stringify(update, null, 2));

  try {
    const message = update.message;
    const userId = message.from.id;
    const userName = message.from.first_name;
    const userMessage = message.text?.trim().toLowerCase();

    console.log(`From ${userName} (${userId}): ${userMessage}`);

    if (["yes", "no"].includes(userMessage)) {
      await Response.create({
        userId,
        response: userMessage,
        gameDate: new Date(),
        timestamp: new Date(),
      });

      await sendMessage(
        userId,
        `Got it ${userName}, your vote '${userMessage.toUpperCase()}' is recorded ✅`
      );
    }

    if (userMessage === "generate teams") {
      const yesPlayers = await Response.find({ response: "yes" });
      const names = yesPlayers.map((p) => p.userId);
      const half = Math.ceil(names.length / 2);

      const teamA = names.slice(0, half);
      const teamB = names.slice(half);

      await sendMessage(
        userId,
        `⚽ Teams generated!\n\nTeam A: ${teamA.join(
          ", "
        )}\nTeam B: ${teamB.join(", ")}`
      );
    }
  } catch (err) {
    console.error("Webhook processing error:", err.message);
  }

  res.sendStatus(200);
});

export default app;
