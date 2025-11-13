import OpenAI from "openai";
import "dotenv/config";
import { modifiedPlayerData } from "./index.js";

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

console.log(modifiedPlayerData);
const response = await client.responses.create({
  model: "gpt-5-nano",
  input: `Based on the following player data, split the players into two teams such that both teams are balanced based on overall stats of the players, also give each team a name and color from BLUE OR RED, and assign a captain, ${JSON.stringify(
    modifiedPlayerData
  )}`,
});

console.log(response.output_text);

console.log("Done");
