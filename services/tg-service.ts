import fetch from "node-fetch";
import "dotenv/config";

// Use type assertion for environment variables
const TELEGRAM_TOKEN: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API: string = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

type ChatId = number | string;

/**
 * Send a text message to a user
 */
export async function sendMessage(chatId: ChatId, text: string): Promise<void> {
  if (!TELEGRAM_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN is not defined.");
    return;
  }
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (err) {
    // Handle error as an Error object for consistent typing
    const error = err as Error;
    console.error("❌ Error sending message:", error.message);
  }
}

/**
 * Set Telegram webhook URL (run on startup)
 */
export async function setWebhook(url: string): Promise<void> {
  if (!TELEGRAM_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN is not defined.");
    return;
  }
  try {
    const res = await fetch(`${TELEGRAM_API}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    // Use 'any' as the exact response structure may not be defined
    const data: any = await res.json();
    console.log("✅ Webhook set:", data);
  } catch (err) {
    const error = err as Error;
    console.error("❌ Error setting webhook:", error.message);
  }
}

/**
 * Send message to multiple users (optional helper)
 */
export async function broadcastMessage(
  userIds: ChatId[],
  text: string
): Promise<void> {
  for (const id of userIds) {
    await sendMessage(id, text);
  }
}
