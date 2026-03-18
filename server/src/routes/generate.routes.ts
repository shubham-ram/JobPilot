import { Router, Request, Response } from "express";
import { generateAnswer } from "../services/gemini.service";

const router = Router();

// POST /api/generate — stateless proxy to Gemini
router.post("/", async (req: Request, res: Response) => {
  try {
    const { profileContext, jobDescription, question, companyName, maxChars } =
      req.body;

    if (!jobDescription || !question) {
      res
        .status(400)
        .json({ error: "jobDescription and question are required" });
      return;
    }

    const answer = await generateAnswer({
      profileContext: profileContext || "",
      jobDescription,
      question,
      companyName,
      maxChars: maxChars ? parseInt(maxChars, 10) : undefined,
    });

    res.json({ answer });
  } catch (error) {
    console.error("Error generating answer:", error);
    res.status(500).json({ error: "Failed to generate answer" });
  }
});

export default router;
