import {
  GradesSyllabusContextAgent,
  StudentContextAgent,
  TeacherContextAgent,
} from "./subAgents";
import { FormatAgent } from "./FormatAgent";
import { GoogleGenAI } from "@google/genai";

// Agent interface (optional, but good practice)
interface IAgent {
  run(prompt: string): Promise<any>;
}

// Master Planner Agent
export class MasterPlannerAgent implements IAgent {
  private model: any;
  private teacherContextAgent: TeacherContextAgent;
  private gradesSyllabusContextAgent: GradesSyllabusContextAgent;
  private studentContextAgent: StudentContextAgent;
  private formatAgent: FormatAgent;

  constructor() {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    this.model = genAI;
    this.teacherContextAgent = new TeacherContextAgent();
    this.gradesSyllabusContextAgent = new GradesSyllabusContextAgent();
    this.studentContextAgent = new StudentContextAgent();
    this.formatAgent = new FormatAgent();
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

    // 3. Call the Gemini API to get the raw plan text
    try {
      const result = await this.model.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });
      const planText = result.text;

      // 4. Format the plan text into JSON
      const formattedPlan = await this.formatAgent.run(planText);
      console.log({ formattedPlan });
      return formattedPlan;
    } catch (error) {
      console.error("Error in MasterPlannerAgent:", error);
      throw new Error("Failed to generate and format the lesson plan.");
    }
  }

  // TODO: Implement methods for dynamic editing, locking, and progress tracking.
}
