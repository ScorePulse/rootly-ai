import express from "express";
import {
  getAllStudents,
  createStudent,
} from "../controllers/studentController";

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", createStudent);

export default router;
