import {
  GradesSyllabusContextAgent,
  StudentContextAgent,
  TeacherContextAgent,
} from "./subAgents";
import { FormatAgent } from "./FormatAgent";
import { GoogleGenAI } from "@google/genai";

// Agent interface (optional, but good practice)
interface IAgent {
  run(prompt: string, userId: string): Promise<any>;
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

  async run(prompt: string, userId: string): Promise<any> {
    // 1. Gather context from sub-agents
    const teacherContext = await this.teacherContextAgent.getContext(userId);
    const gradesSyllabusContext =
      await this.gradesSyllabusContextAgent.getContext();
    const studentContext = await this.studentContextAgent.getContext();

    // 2. Construct a detailed prompt for the Gemini model
    const fullPrompt = `
      As the Master Planner Agent, your task is to create a detailed and personalized weekly lesson plan for a teacher.

      **CONTEXT:**
      - **Teacher Profile:** ${JSON.stringify(teacherContext)}
      - **Syllabus and Grade Level:** ${JSON.stringify(gradesSyllabusContext)}
      - **Student Profile:** ${JSON.stringify(studentContext)}

      **TEACHER'S REQUEST:**
      "${prompt}"

      **INSTRUCTIONS:**
      Based on all the provided context, generate a comprehensive weekly learning schedule from Monday to Friday.

      For each day, provide a detailed schedule of activities. Each activity must include:
      1.  **Time Slot:** (e.g., 9:00 - 9:45)
      2.  **Activity Title:** (e.g., Mathematics Workshop)
      3.  **Subject/Category:** (e.g., Mathematics, English, Science, Art, General)
      4.  **Brief Description:** A short sentence explaining the activity's objective.

      Ensure the plan covers various subjects throughout the week, tailored to the students' needs and the teacher's goals. The output should be a clear, well-structured text that can be easily parsed.
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
