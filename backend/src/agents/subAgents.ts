import { db } from "../config/admin";

// Sub-Agents for providing context to the Master Planner Agent

// Agent interface (optional, but good practice)
interface IContextAgent {
  getContext(userId?: string): Promise<any>;
}

// Sub-Agent 1: Teacher Context Agent
export class TeacherContextAgent implements IContextAgent {
  async getContext(userId: string): Promise<any> {
    if (!userId) {
      throw new Error("User ID is required to fetch teacher context.");
    }
    try {
      const userDoc = await db.collection("users").doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        // Return a structured context object based on the user data
        return {
          name: userData?.name || "N/A",
          email: userData?.email || "N/A",
          // Add any other relevant fields from your user document
          specializations: userData?.specializations || ["General"],
          teachingStyle: userData?.teachingStyle || "Interactive",
        };
      } else {
        console.warn(
          `No user found with ID: ${userId}. Returning default teacher context.`
        );
        // Return a default context if the user is not found
        return {
          specializations: ["Math", "Science"],
          teachingStyle: "Interactive",
          language: "Marathi",
        };
      }
    } catch (error) {
      console.error("Error fetching teacher context from Firestore:", error);
      throw new Error("Failed to fetch teacher context.");
    }
  }
}

// Sub-Agent 2: Grades & Syllabus Context Agent
export class GradesSyllabusContextAgent implements IContextAgent {
  async getContext(): Promise<any> {
    // In a real application, this would fetch data from Firestore
    return {
      grades: [1, 2, 3],
      syllabus: {
        grade1: {
          math: ["counting", "addition"],
          science: ["plants", "animals"],
        },
        grade2: {
          math: ["subtraction", "multiplication"],
          science: ["water cycle", "food chain"],
        },
        grade3: {
          math: ["division", "fractions"],
          science: ["solar system", "human body"],
        },
      },
    };
  }
}

// Sub-Agent 3: Student Context Agent
export class StudentContextAgent implements IContextAgent {
  async getContext(): Promise<any> {
    // In a real application, this would fetch data from Firestore
    return {
      students: [
        {
          id: "student1",
          grade: 1,
          skillLevels: { math: "beginner", science: "intermediate" },
          learningStyle: "visual",
        },
        {
          id: "student2",
          grade: 2,
          skillLevels: { math: "intermediate", science: "advanced" },
          learningStyle: "kinesthetic",
        },
        {
          id: "student3",
          grade: 3,
          skillLevels: { math: "advanced", science: "advanced" },
          learningStyle: "auditory",
        },
      ],
    };
  }
}
