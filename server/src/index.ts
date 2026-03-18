import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Load env vars
dotenv.config();

import generateRoutes from "./routes/generate.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Only route — stateless Gemini proxy
app.use("/api/generate", generateRoutes);
app.get("/", (req, res) => {
  res.json("working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
