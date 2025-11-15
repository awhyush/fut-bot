import OpenAI from "openai";
import "dotenv/config";
import { modifiedPlayerData } from "./utils/index";

async function generateTeams() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPEN_API_KEY,
    });

    console.log("Modified player data:", modifiedPlayerData);

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `Based on the following player data, split the players into two teams such that both teams are balanced based on overall stats of the players. 
Also give each team a name and color (BLUE or RED), and assign a captain. 
Player data: ${JSON.stringify(modifiedPlayerData)}`,
    });

    console.log("AI Response:", response.output_text ?? "No output returned");

    console.log("Done");
  } catch (err) {
    console.error("Error generating teams:", (err as Error).message);
  }
}

generateTeams();
