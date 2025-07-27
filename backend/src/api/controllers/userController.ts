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
};
