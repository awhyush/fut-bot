import fetch from "node-fetch";
import "dotenv/config";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

/**
 * Send a text message to a user
 */
export async function sendMessage(chatId, text) {
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
  }
}

/**
 * Set Telegram webhook URL (run on startup)
 */
export async function setWebhook(url) {
  try {
    const res = await fetch(`${TELEGRAM_API}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    console.log("✅ Webhook set:", data);
  } catch (err) {
    console.error("❌ Error setting webhook:", err.message);
  }
}

/**
 * Send message to multiple users (optional helper)
 */
export async function broadcastMessage(userIds, text) {
  for (const id of userIds) {
    await sendMessage(id, text);
  }
}
