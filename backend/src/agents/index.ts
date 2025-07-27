import {
  GenerateContentResponse,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  Part,
} from "@google/genai";

// Initialize Vertex with your Cloud project and location
const projectID = process.env.VERTEX_AI_PROJECT_ID;
const project_location = process.env.VERTEX_AI_LOCATION;
const project_rag_id = process.env.VERTEX_AI_RAG_ID;
console.log({
  projectID,
  project_location,
  project_rag_id,
});
const ai = new GoogleGenAI({
  vertexai: true,
  project: projectID,
  location: project_location,
});
const model = "gemini-2.5-flash";

const tools = [
  {
    retrieval: {
      vertexRagStore: {
        ragResources: [
          {
            ragCorpus: `projects/${projectID}/locations/${project_location}/ragCorpora/${project_rag_id}`,
          },
        ],
      },
    },
  },
];

// Set up generation config
const generationConfig = {
  maxOutputTokens: 65535,
  temperature: 1,
  topP: 0.95,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
  tools: tools,
};

const chat = ai.chats.create({
  model: model,
  config: generationConfig,
});

export async function sendMessage(message: string): Promise<string> {
  const contentParts: Part[] = [{ text: message }];
  const response: GenerateContentResponse = await chat.sendMessage({
    message: contentParts,
  });

  return response?.text || ""; // Return the collected text
}
