const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, db } = require("../../config/firebase");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  const idToken = authorization.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  req.user = decodedToken;
  next();
});

router.post(
  "/create",
  authMiddleware,
  asyncHandler(async (req, res) => {
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

module.exports = router;
