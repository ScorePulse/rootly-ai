import { GoogleGenAI, GenerateContentResponse } from "@google/genai"; // Import GenerateContentResponse for typing
import {
  GradesSyllabusContextAgent,
  StudentContextAgent,
  TeacherContextAgent,
} from "./subAgents";

// Agent interface (optional, but good practice)
interface IAgent {
  run(
    prompt: string
  ): Promise<AsyncGenerator<GenerateContentResponse, any, any>>; // Update return type
}

// Master Planner Agent
export class MasterPlannerAgent implements IAgent {
  private genAI: GoogleGenAI;
  private teacherContextAgent: TeacherContextAgent;
  private gradesSyllabusContextAgent: GradesSyllabusContextAgent;
  private studentContextAgent: StudentContextAgent;

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    this.teacherContextAgent = new TeacherContextAgent();
    this.gradesSyllabusContextAgent = new GradesSyllabusContextAgent();
    this.studentContextAgent = new StudentContextAgent();
  }

  // Changed the return type to Promise<AsyncGenerator<GenerateContentResponse, any, any>>
  async run(
    prompt: string
  ): Promise<AsyncGenerator<GenerateContentResponse, any, any>> {
    // 1. Gather context from sub-agents
    const teacherContext = await this.teacherContextAgent.getContext();
    const gradesSyllabusContext =
      await this.gradesSyllabusContextAgent.getContext();
    const studentContext = await this.studentContextAgent.getContext();

    // 2. Construct a detailed prompt for the Gemini model
    const fullPrompt = `
      As the Master Planner Agent, your task is to create a personalized weekly lesson plan.

      Here is the context:
      - Teacher Context: ${JSON.stringify(teacherContext)}
      - Grades & Syllabus Context: ${JSON.stringify(gradesSyllabusContext)}
      - Student Context: ${JSON.stringify(studentContext)}

      Teacher's Request: "${prompt}"

      Based on all this information, generate a weekly plan.
    `;

    // 3. Call the Gemini API and return the stream
    try {
      const result = await this.genAI.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      });
      // Return the async generator directly
      return result;
    } catch (error) {
      console.error("Error generating content from Gemini:", error);
      throw new Error("Failed to initialize lesson plan stream.");
    }
  }

  // TODO: Implement methods for dynamic editing, locking, and progress tracking.
}
