// config.mjs (or your_file_name.js, after setting "type": "module" in package.json)

import {
  FunctionDeclarationSchemaType, // You might not need this if not using function calling schemas directly in this config
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";

// Access environment variables directly
const project = process.env.VERTEX_AI_PROJECT_ID;
const location = process.env.VERTEX_AI_LOCATION;
const textModel = "gemini-1.5-flash";
const visionModel = "gemini-1.5-flash";

const vertexAI = new VertexAI({ project: project, location: location });

// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 256 },
  systemInstruction: {
    role: "system",
    parts: [{ text: `For example, you are a helpful customer service agent.` }],
  },
});

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
  model: textModel,
});

// If you want to export these models for use in other files:
export {
  generativeModel,
  generativeVisionModel,
  generativeModelPreview,
  project,
  location,
  textModel,
  visionModel,
};
