import express from "express";
import { createStudents } from "../controllers/testController";

const router = express.Router();

router.post("/create-students", createStudents);

export default router;
