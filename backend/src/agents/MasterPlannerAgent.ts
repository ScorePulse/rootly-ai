import { VertexAI } from "@google-cloud/vertexai";
import {
  GradesSyllabusContextAgent,
  StudentContextAgent,
  TeacherContextAgent,
} from "./subAgents";

// Agent interface (optional, but good practice)
interface IAgent {
  run(prompt: string): Promise<any>;
}

// Master Planner Agent
export class MasterPlannerAgent implements IAgent {
  private vertexAI: VertexAI;
  private teacherContextAgent: TeacherContextAgent;
  private gradesSyllabusContextAgent: GradesSyllabusContextAgent;
  private studentContextAgent: StudentContextAgent;

  constructor() {
    this.vertexAI = new VertexAI({
      project: process.env.GOOGLE_PROJECT_ID || "",
      location: process.env.GOOGLE_LOCATION || "",
    });
    this.teacherContextAgent = new TeacherContextAgent();
    this.gradesSyllabusContextAgent = new GradesSyllabusContextAgent();
    this.studentContextAgent = new StudentContextAgent();
  }

  async run(prompt: string): Promise<any> {
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

    // 3. Call the Gemini API
    const generativeModel = this.vertexAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    try {
      const result = await generativeModel.generateContent(fullPrompt);
      const response = result.response;
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      return { plan: text };
    } catch (error) {
      console.error("Error generating content from Gemini:", error);
      throw new Error("Failed to generate lesson plan.");
    }
  }

  // TODO: Implement methods for dynamic editing, locking, and progress tracking.
}
