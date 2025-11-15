import express, { Request, Response as ExpressResponse } from "express";
import "dotenv/config";
import Vote from "../models/votes";
import Player from "../models/player";
import { sendMessage } from "../services/tg-service";
import { TelegramUpdate } from "./types";
import { IPlayer, IVoteResponse } from "../models/types";

const app = express();
app.use(express.json());

// Custom Request type for the webhook body
type WebhookRequest = Request<any, any, TelegramUpdate>;

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req: WebhookRequest, res: ExpressResponse) => {
  const update: TelegramUpdate = req.body;
  console.log("📩 Received update:", JSON.stringify(update, null, 2));

  try {
    const message = update.message;

    // Guard clause for non-message updates or missing required fields
    if (!message || !message.from || !message.text) {
      console.log(
        "Skipping update: Not a standard text message or missing fields."
      );
      return res.sendStatus(200);
    }

    const userId: number = message.from.id;
    const userName: string = message.from.first_name;
    const userMessage: string = message.text.trim().toLowerCase();

    console.log(`From ${userName} (${userId}): ${userMessage}`);

    // Fetch the player's role
    const player: IPlayer | null = await Player.findOne({
      telegramId: String(userId),
    });
    if (!player) {
      await sendMessage(userId, `⚠️ You are not registered in the system.`);
      return res.sendStatus(200);
    }

    // --- Handle Voting Logic (all players can vote) ---
    if (["yes", "no"].includes(userMessage)) {
      await Vote.create({
        userId: String(userId),
        vote: userMessage as "yes" | "no",
        gameDate: new Date().toISOString().split("T")[0],
        timestamp: new Date(),
      });

      await sendMessage(
        userId,
        `Got it ${userName}, your vote '${userMessage.toUpperCase()}' is recorded ✅`
      );
      return res.sendStatus(200);
    }

    // --- Admin-only commands ---
    if (["generate teams", "start poll"].includes(userMessage)) {
      if (player.role !== "Admin") {
        await sendMessage(userId, `❌ Only admins can perform this action.`);
        return res.sendStatus(200);
      }

      if (userMessage === "/generate") {
        const yesPlayers: IVoteResponse[] = await Vote.find({
          vote: "yes",
        }).exec();
        const names: string[] = yesPlayers.map((p) => p.userId);

        names.sort(() => Math.random() - 0.5);

        const half = Math.ceil(names.length / 2);
        const teamA: string[] = names.slice(0, half);
        const teamB: string[] = names.slice(half);

        await sendMessage(
          userId,
          `⚽ Teams generated!\n\nTeam A: ${teamA.join(
            ", "
          )}\nTeam B: ${teamB.join(", ")}`
        );
      }

      if (userMessage === "/start-poll") {
        // Implement poll creation logic here
        await sendMessage(userId, `✅ Poll has been started.`);
      }
    }
  } catch (err) {
    const error = err as Error;
    console.error("Webhook processing error:", error.message);
  }

  res.sendStatus(200);
});

export default app;
