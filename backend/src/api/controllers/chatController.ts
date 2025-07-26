import { Request, Response } from "express";

const initialMessage = "Welcome to the chat! How can I help you today?";
let isFirstMessage = true;

export const chatController = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (isFirstMessage) {
    isFirstMessage = false;
    return res.json({ reply: initialMessage });
  }

  // Simple echo logic for demonstration
  const reply = `You said: "${message}"`;
  res.json({ reply });
};
