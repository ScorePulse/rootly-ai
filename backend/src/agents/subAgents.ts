// Sub-Agents for providing context to the Master Planner Agent

// Agent interface (optional, but good practice)
interface IContextAgent {
  getContext(): Promise<any>;
}

// Sub-Agent 1: Teacher Context Agent
export class TeacherContextAgent implements IContextAgent {
  async getContext(): Promise<any> {
    // In a real application, this would fetch data from Firestore
    return {
      specializations: ["Math", "Science"],
      teachingStyle: "Interactive",
      availableTime: "2 hours daily",
      facilities: ["blackboard", "projector"],
      language: "Marathi",
    };
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
