import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./api/routes/userRoutes";
import chatRoutes from "./api/routes/chatRoutes";
import testRoutes from "./api/routes/testRoutes";
import studentRoutes from "./api/routes/studentRoutes";
import scheduleRoutes from "./api/routes/scheduleRoutes";
import loggingMiddleware from "./middleware/loggingMiddleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/test", testRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/schedules", scheduleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
