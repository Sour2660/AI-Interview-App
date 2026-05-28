import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use(
"/api/interview",
interviewRoutes
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});