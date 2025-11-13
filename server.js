import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./hooks/tg-hook.js";
import { setWebhook } from "./services/telegramService.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Connect to MongoDB
await mongoose.connect(MONGODB_URI);
console.log("✅ MongoDB connected");

// Set Telegram webhook on startup
await setWebhook(WEBHOOK_URL);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
