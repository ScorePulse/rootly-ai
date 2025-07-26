import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { auth, db } from "../../config/admin";
import { DecodedIdToken } from "firebase-admin/auth";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

const authMiddleware = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  }
);

router.post("/login", loginUser);
router.post("/register", registerUser);

router.put("/profile/:uid", authMiddleware, updateUserProfile);

router.post(
  "/create",
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    const verifiedUid = req.user.uid;
    const { uid, name, email } = req.body;

    if (verifiedUid !== uid) {
      res.status(403);
      throw new Error("Forbidden: Token does not match user ID.");
    }

    if (!name || !email) {
      res.status(400);
      throw new Error("Missing name or email");
    }

    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      await userRef.set({
        uid,
        name,
        email,
        createdAt: new Date(),
      });
    }
    res.status(201).send({ message: "User created successfully" });
  })
);

export default router;
