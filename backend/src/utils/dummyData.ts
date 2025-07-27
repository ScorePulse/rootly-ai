import { v4 as uuidv4 } from "uuid";
import { geminiService } from "../config/gemini";

const firstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Saanvi",
  "Aadya",
  "Kiara",
  "Diya",
  "Pari",
  "Ananya",
  "Riya",
  "Sita",
  "Tara",
  "Navya",
];
const lastNames = [
  "Sharma",
  "Verma",
  "Gupta",
  "Singh",
  "Kumar",
  "Patel",
  "Shah",
  "Mehta",
  "Joshi",
  "Reddy",
];
const grades = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const learningStyles = ["Visual", "Auditory", "Kinesthetic", "Reading/Writing"];
const specialNeedsOptions = [
  "Dyslexia",
  "ADHD",
  "Visual impairment",
  "None",
  "None",
  "None",
  "None",
  "None",
  "None",
  "None",
];
const additionalNotesOptions = [
  "Requires extra time for exams.",
  "Prefers seating at the front of the class.",
  "Peanut allergy.",
  "None",
  "None",
  "None",
  "None",
  "None",
  "None",
  "None",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function generateStudentSummary(student: any): Promise<string> {
  const prompt = `Create a short, one-paragraph summary for the following student:\n
  Name: ${student.firstName} ${student.lastName}
  Age: ${student.age}
  Grade: ${student.grade}
  Preferred Learning Style: ${student.preferredLearningStyle}
  Special Needs or Accommodations: ${student.specialNeedsOrAccommodations}
  Additional Notes: ${student.additionalNotes}
  `;

  try {
    return await geminiService.generateStudentSummary(prompt);
  } catch (error) {
    console.error("Error generating student summary:", error);
    return "Could not generate summary.";
  }
}

export const createDummyStudents = async (count: number, userId: string) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const grade = getRandomElement(grades);
    const age = Math.floor(Math.random() * 8) + 6; // Ages 6 to 13 for grades 1-8
    const dob = getRandomDate(new Date(2011, 0, 1), new Date(2019, 11, 31));
    const studentId = uuidv4();
    const preferredLearningStyle = getRandomElement(learningStyles);
    const specialNeeds = getRandomElement(specialNeedsOptions);
    const additionalNotes = getRandomElement(additionalNotesOptions);

    const studentData = {
      firstName,
      lastName,
      grade,
      age,
      dateOfBirth: dob.toLocaleDateString("en-GB"), // dd-mm-yyyy
      studentId,
      preferredLearningStyle,
      specialNeedsOrAccommodations: specialNeeds,
      additionalNotes,
      userId,
      summary: "",
    };

    studentData.summary = await generateStudentSummary(studentData);
    students.push(studentData);
  }
  return students;
};
