import {
  GoogleGenAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentConfig, // Import for type safety
} from "@google/genai";

class GeminiService {
  private genAI: GoogleGenAI;
  private modelName: string;
  private systemInstructionText: string;
  private defaultGenerationConfig: GenerateContentConfig; // Use the specific type

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    this.genAI = new GoogleGenAI({ apiKey });
    this.modelName = "gemini-1.5-flash"; // Define the model to use
    // Define the system instruction for the model's persona or behavior. [5, 9]
    this.systemInstructionText =
      "You are a helpful assistant that creates a summary of a student's profile.";
    this.defaultGenerationConfig = {
      maxOutputTokens: 256,
      temperature: 0.7,
      // Note: systemInstruction is added dynamically in generateStudentSummary
    };
  }

  /**
   * Generates a summary of a student's profile using the configured Gemini model.
   * The system instruction defines the model's role for this service.
   *
   * @param {string} studentProfileText The student's profile information as text.
   * @param {Partial<GenerateContentConfig>} [overrideConfig] Optional overrides for generation parameters.
   * @returns {Promise<string>} The generated text summary of the student's profile.
   */
  public async generateStudentSummary(
    studentProfileText: string,
    overrideConfig?: Partial<GenerateContentConfig>
  ): Promise<string> {
    // Combine default and override generation configurations
    const combinedGenerationConfig: GenerateContentConfig = {
      ...this.defaultGenerationConfig,
      ...overrideConfig,
      // The system instruction is provided within the 'generationConfig' object
      // of the generateContent method. It should be a Content object. [7, 8, 9]
      systemInstruction: { parts: [{ text: this.systemInstructionText }] },
    };

    try {
      // The generateContent method is called on the 'models' submodule of the GoogleGenAI client. [1, 2, 3, 7]
      const result = await this.genAI.models.generateContent({
        model: this.modelName,
        // The input 'contents' for the model should be an array of Content objects.
        // For simple text, it's an array containing a single text part. [7]
        contents: [{ parts: [{ text: studentProfileText }] }],
        config: combinedGenerationConfig,
        // It's recommended to include safety settings for production applications. [7]
      });

      const text = result.text;
      return text || "";
    } catch (error) {
      console.error("Error generating student summary:", error);
      throw error;
    }
  }
}

// Export an instance of the service
const geminiService = new GeminiService();
export { geminiService };

/*
// Example of how to use the corrected GeminiService:

async function testStudentSummaryGeneration() {
  const exampleStudentProfile = `
    Student Name: John Doe
    ID: S12345
    Grades: Math - A, Science - B+, English - A-
    Extracurriculars: Captain of Robotics Club, Editor for School Newspaper
    Achievements: Won regional science fair in 2023.
    Notes: John is strong in STEM fields and shows good leadership potential.
  `;

  try {
    const summary = await geminiService.generateStudentSummary(exampleStudentProfile);
    console.log("Generated Student Summary:");
    console.log(summary);
  } catch (error) {
    console.error("Failed to generate student summary:", error);
  }
}

// Call the example function to test
// testStudentSummaryGeneration();
*/
