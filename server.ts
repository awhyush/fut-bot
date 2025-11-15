import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./hooks/tg-hook";
import { setWebhook } from "./services/tg-service";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;
const WEBHOOK_URL = process.env.WEBHOOK_URL as string;

async function bootstrap() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Set Telegram webhook
    await setWebhook(WEBHOOK_URL);
    console.log("🔗 Webhook set:", WEBHOOK_URL);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", (err as Error).message);
    process.exit(1);
  }
}

bootstrap();
