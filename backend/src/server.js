require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { auth, db, storage } = require("./config/firebase");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
