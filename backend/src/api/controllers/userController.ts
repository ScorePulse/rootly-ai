import { Request, Response } from "express";
import { auth, db } from "../../config/admin";

const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    // Create user with Firebase Admin Auth
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // Create user document in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name: name,
      email: email,
      isRegistered: true,
      isProfileComplete: false,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: userRecord.uid,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log("Login request received");
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);
  try {
    // For login, we actually don't need server-side authentication
    // The frontend handles Firebase Auth login
    // This endpoint can be removed or used for custom token generation
    res.status(200).json({
      message: "Login should be handled on the frontend with Firebase Auth",
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const data = req.body;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update(data);
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error: any) {
    console.error("Update profile error:", error);
    res.status(400).json({ error: error.message });
  }
};

const completeRegistration = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update({ isRegistered: true });
    res.status(200).json({ message: "Registration completed successfully" });
  } catch (error: any) {
    console.error("Complete registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

const completeProfile = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update({ isProfileComplete: true });
    res.status(200).json({ message: "Profile completed successfully" });
  } catch (error: any) {
    console.error("Complete profile error:", error);
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    // Ensure tasks is always an array, even if the field doesn't exist
    const tasks = Array.isArray(userData?.tasks) ? userData.tasks : [];

    res.status(200).json({ tasks });
  } catch (error: any) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: error.message });
  }
};

const addTask = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { title, type = "review" } = req.body;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const currentTasks = userData?.tasks || [];

    const newTask = {
      id: Date.now().toString(), // Simple ID generation
      title,
      status: "pending",
      type,
      createdAt: new Date(),
      isAIGenerated: false,
    };

    const updatedTasks = [...currentTasks, newTask];

    await userRef.update({ tasks: updatedTasks });
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error: any) {
    console.error("Add task error:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { uid, taskId } = req.params;
  const { status, title, type } = req.body;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const currentTasks = userData?.tasks || [];

    const taskIndex = currentTasks.findIndex((task: any) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = {
      ...currentTasks[taskIndex],
      ...(status && { status }),
      ...(title && { title }),
      ...(type && { type }),
      updatedAt: new Date(),
    };

    currentTasks[taskIndex] = updatedTask;

    await userRef.update({ tasks: currentTasks });
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error: any) {
    console.error("Update task error:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { uid, taskId } = req.params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const currentTasks = userData?.tasks || [];

    const updatedTasks = currentTasks.filter((task: any) => task.id !== taskId);

    await userRef.update({ tasks: updatedTasks });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Delete task error:", error);
    res.status(400).json({ error: error.message });
  }
};

const generateAITasks = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    // Get user data from Firestore
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    // Prepare context for AI agent
    const userContext = {
      name: userData?.name || "User",
      email: userData?.email || "",
      profile: {
        isProfileComplete: userData?.isProfileComplete || false,
        // Add any profile fields you have
        interests: userData?.interests || [],
        goals: userData?.goals || [],
        subjects: userData?.subjects || [],
        grade: userData?.grade || "",
        preferredStudyTime: userData?.preferredStudyTime || "",
      },
      existingTasks: userData?.tasks || [],
      createdAt: userData?.createdAt,
    };

    // Call AI agent to generate tasks
    const aiGeneratedTasks = await callAIAgent(userContext);

    // Add generated tasks to user's tasks array
    const currentTasks = userData?.tasks || [];
    const updatedTasks = [...currentTasks, ...aiGeneratedTasks];

    await userRef.update({
      tasks: updatedTasks,
    });

    res.status(200).json({
      message: "AI tasks generated successfully",
      tasks: aiGeneratedTasks,
    });
  } catch (error: any) {
    console.error("Generate AI tasks error:", error);
    res.status(500).json({ error: error.message });
  }
};

// AI Agent function to generate tasks based on user context
const callAIAgent = async (userContext: any) => {
  const { GoogleGenAI } = require("@google/genai");

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Get students data for the teacher
  const studentsData = await getStudentsForTeacher(userContext.uid);

  const prompt = `
You are an AI task planning agent for an educational app. Based on the teacher's profile and their students' profiles, generate 5-7 relevant, actionable tasks that will help the teacher manage their classroom effectively.

Teacher Context:
- Name: ${userContext.name}
- Email: ${userContext.email}
- Profile Complete: ${userContext.profile.isProfileComplete}
- Interests: ${JSON.stringify(userContext.profile.interests)}
- Goals: ${JSON.stringify(userContext.profile.goals)}
- Subjects: ${JSON.stringify(userContext.profile.subjects)}
- Grade: ${userContext.profile.grade}
- Preferred Study Time: ${userContext.profile.preferredStudyTime}
- Existing Tasks: ${userContext.existingTasks.length} tasks

Students in Classroom:
${
  studentsData.length > 0
    ? studentsData
        .map(
          (student) => `
- ${student.firstName} ${student.lastName} (Grade ${student.grade}, Age ${
            student.age
          }, DOB: ${student.dateOfBirth})
  * Learning Style: ${student.preferredLearningStyle}
  * Special Needs/Accommodations: ${student.specialNeedsOrAccommodations}
  * Additional Notes (allergies, health): ${student.additionalNotes || "None"}
  * Student Summary: ${student.summary || "No summary available"}
  * Student ID: ${student.studentId}
`
        )
        .join("\n")
    : "No students data available"
}

Rules:
1. Generate 5-7 educational/teaching-related tasks
2. Make tasks specific and actionable for a teacher
3. Consider both teacher's profile and students' individual needs and characteristics
4. Include tasks for student assessment, lesson planning, and classroom management
5. Pay special attention to students with special needs, allergies, or learning accommodations
6. Consider students' preferred learning styles when generating lesson planning tasks
7. Generate individual support tasks for students with specific needs (dyslexia, allergies, etc.)
8. Include communication tasks for parents about students with special requirements
6. Include tasks for students who need special attention (low scores, declining progress, special needs)
7. Make tasks appropriate for the grade level being taught
8. Include a mix of different types: planning, assessment, individual support, classroom management, communication

Task Types to Consider:
- Individual student support (for students with dyslexia, learning differences)
- Lesson planning (adapted for different learning styles: Reading/Writing, Visual, etc.)
- Safety management (allergy protocols, emergency plans)
- Assessment and progress tracking (age-appropriate for different grades)
- Parent/guardian communication (especially for special needs students)
- Classroom management (accommodating special needs)
- Professional development (special education strategies)
- Resource preparation (adapted materials for different learning styles)
- Accommodation planning (for students with disabilities)

Special Considerations for Task Generation:
- If students have allergies (like peanut allergy), prioritize safety and emergency preparedness
- If students have learning disabilities (like dyslexia), focus on appropriate teaching strategies
- Consider age differences when students are in different grades
- Adapt teaching methods based on preferred learning styles
- Include communication with parents for students with special needs

Return ONLY a valid JSON array with this exact format:
[
  {
    "id": "unique_id_1",
    "title": "Task title",
    "type": "planning",
    "status": "pending",
    "priority": "high",
    "estimatedTime": "45 mins",
    "subject": "Math",
    "description": "Detailed description of what needs to be done and why",
    "createdAt": "${new Date().toISOString()}"
  }
]
`;

  try {
    // Use the correct API method for @google/genai package
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    });

    const text = result.text;

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const tasks = JSON.parse(jsonMatch[0]);
      return tasks.map((task: any, index: number) => ({
        ...task,
        id: `ai_${Date.now()}_${index}`,
        createdAt: new Date(),
        isAIGenerated: true,
      }));
    } else {
      // Fallback tasks if AI response is not parseable
      return generateFallbackTasks(userContext, studentsData);
    }
  } catch (error) {
    console.error("AI generation error:", error);
    return generateFallbackTasks(userContext, studentsData);
  }
};

// Tool function to get all students for a teacher
const getStudentsForTeacher = async (teacherUid: string) => {
  try {
    // Get all students from the students collection
    // Filter by userId to get students for this specific teacher
    const studentsSnapshot = await db
      .collection("students")
      .where("userId", "==", teacherUid)
      .get();

    const students = studentsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        studentId: data.studentId || doc.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        grade: data.grade || "",
        age: data.age || 0,
        dateOfBirth: data.dateOfBirth || "",
        preferredLearningStyle: data.preferredLearningStyle || "Not specified",
        specialNeedsOrAccommodations:
          data.specialNeedsOrAccommodations || "None",
        additionalNotes: data.additionalNotes || "",
        summary: data.summary || "No summary available",
        userId: data.userId || "",
        // Include any other fields that might exist
        ...data,
      };
    });

    return students;
  } catch (error) {
    console.error("Error fetching students for teacher:", error);
    return [];
  }
};

// Fallback function to generate basic tasks if AI fails
const generateFallbackTasks = (userContext: any, studentsData: any[] = []) => {
  const subjects =
    userContext.profile.subjects.length > 0
      ? userContext.profile.subjects
      : ["Math", "Science", "English"];

  const baseTasks = [
    {
      id: `fallback_${Date.now()}_1`,
      title: `Review ${subjects[0]} concepts for lesson planning`,
      type: "planning",
      status: "pending",
      priority: "medium",
      estimatedTime: "30 mins",
      subject: subjects[0],
      description: "Prepare lesson materials and review curriculum standards",
      createdAt: new Date(),
      isAIGenerated: true,
    },
    {
      id: `fallback_${Date.now()}_2`,
      title: `Assess student progress in ${
        subjects[1] || "your primary subject"
      }`,
      type: "assessment",
      status: "pending",
      priority: "high",
      estimatedTime: "45 mins",
      subject: subjects[1] || "General",
      description:
        "Review recent assignments and update student progress records",
      createdAt: new Date(),
      isAIGenerated: true,
    },
    {
      id: `fallback_${Date.now()}_3`,
      title: "Plan weekly classroom activities",
      type: "planning",
      status: "pending",
      priority: "low",
      estimatedTime: "60 mins",
      subject: "General",
      description: "Design engaging activities for the upcoming week",
      createdAt: new Date(),
      isAIGenerated: true,
    },
  ];

  // Add student-specific tasks if we have student data
  if (studentsData.length > 0) {
    // Find students who need special attention based on actual fields
    const studentsNeedingAttention = studentsData.filter(
      (student) =>
        (student.specialNeedsOrAccommodations !== "None" &&
          student.specialNeedsOrAccommodations !== "") ||
        student.additionalNotes !== "" ||
        student.preferredLearningStyle === "Reading/Writing" // Focus on students with specific learning needs
    );

    studentsNeedingAttention.slice(0, 2).forEach((student, index) => {
      const needsDescription = [];

      if (
        student.specialNeedsOrAccommodations !== "None" &&
        student.specialNeedsOrAccommodations !== ""
      ) {
        needsDescription.push(
          `special needs: ${student.specialNeedsOrAccommodations}`
        );
      }

      if (student.additionalNotes !== "") {
        needsDescription.push(
          `special considerations: ${student.additionalNotes}`
        );
      }

      if (student.preferredLearningStyle !== "Not specified") {
        needsDescription.push(
          `learning style: ${student.preferredLearningStyle}`
        );
      }

      baseTasks.push({
        id: `fallback_student_${Date.now()}_${index}`,
        title: `Individual support plan for ${student.firstName} ${student.lastName}`,
        type: "individual_support",
        status: "pending",
        priority: "high",
        estimatedTime: "30 mins",
        subject: "Individual Support",
        description: `Create personalized support plan considering ${needsDescription.join(
          ", "
        )}`,
        createdAt: new Date(),
        isAIGenerated: true,
      });
    });

    // Add allergy management task if any student has allergies
    const studentsWithAllergies = studentsData.filter(
      (student) =>
        student.additionalNotes &&
        student.additionalNotes.toLowerCase().includes("allergy")
    );

    if (studentsWithAllergies.length > 0) {
      baseTasks.push({
        id: `fallback_allergy_${Date.now()}`,
        title: `Review allergy management protocols`,
        type: "planning",
        status: "pending",
        priority: "high",
        estimatedTime: "20 mins",
        subject: "Safety",
        description: `Review and update allergy management for: ${studentsWithAllergies
          .map((s) => `${s.firstName} ${s.lastName} (${s.additionalNotes})`)
          .join(", ")}`,
        createdAt: new Date(),
        isAIGenerated: true,
      });
    }
  }

  return baseTasks;
};

export {
  registerUser,
  loginUser,
  updateUserProfile,
  completeRegistration,
  completeProfile,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  generateAITasks,
};
