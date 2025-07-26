import { Request, Response } from "express";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
    });
    res.status(201).json({
      message: "User registered successfully",
      userId: user.uid,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log("Login request received");
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({
      message: "User logged in successfully",
      userId: user.uid,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const data = req.body;

  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    await setDoc(userRef, data, { merge: true });
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { registerUser, loginUser, updateUserProfile };
