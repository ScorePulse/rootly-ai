import { GoogleGenAI } from "@google/genai";

const { GoogleGenerativeAI } = require("@google/genai");

interface Activity {
  time: string;
  title: string;
  description: string;
  category: string;
  status: "Completed" | "Upcoming";
  icon: string;
}

interface Day {
  name: string;
  status: string;
  activities: Activity[];
}

export class FormatAgent {
  private model: any;

  constructor() {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    this.model = genAI;
  }

  async run(planText: string): Promise<Day[]> {
    const prompt = `
      You are a formatting agent. Your task is to convert the following weekly learning schedule text into a structured JSON format.
      The JSON output should be an array of Day objects. Each Day object should have 'name', 'status', and an array of 'activities'.
      Each Activity object should have 'time', 'title', 'description', 'category', 'status', and 'icon'.
      For the 'icon' field, choose an appropriate icon name from the lucide-react library (e.g., 'BookOpen', 'RefreshCw', 'Volume2', 'Calendar').

      Here is the schedule text to format:
      ---
      ${planText}
      ---

      Please provide only the JSON array as output. Do not include any other text or markdown formatting like \`\`\`json.
    `;

    try {
      const result = await this.model.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const jsonText = await result.text;

      const cleanedJsonText = jsonText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedJsonText);
    } catch (error) {
      console.error("Error formatting plan to JSON:", error);
      throw new Error("Failed to format the plan into JSON.");
    }
  }
}
